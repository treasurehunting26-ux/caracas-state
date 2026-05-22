/* api/contact.js — POST /api/contact
   Receives a private-showing inquiry, validates, logs the lead and
   notifies the property representative by email.
   Vercel Function (Node.js runtime). */

const RESEND_KEY  = process.env.RESEND_API_KEY || ''
const FROM        = process.env.DOSSIER_FROM     || 'Caracas Luxury Estate <dossier@caracasluxuryestate.com>'
const TO_INTERNAL = process.env.CONTACT_TO       || process.env.DOSSIER_REPLY_TO || 'info@caracasluxuryestate.com'

const RATE = new Map() // ip -> [timestamps]
const RATE_WINDOW_MS = 60 * 60 * 1000   // 1h
const RATE_MAX       = 5                // 5 inquiries / hour / IP

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','tempmail.com','guerrillamail.com','10minutemail.com',
  'yopmail.com','trashmail.com','sharklasers.com','dispostable.com',
  'getnada.com','throwawaymail.com','maildrop.cc','fakeinbox.com',
])

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST')    return json(res, 405, { error: 'method-not-allowed' })

  let body = req.body
  if (!body || typeof body === 'string') {
    try { body = body ? JSON.parse(body) : await readJson(req) } catch { body = {} }
  }
  body = body || {}

  // Honeypot
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return json(res, 200, { ok: true })
  }

  const firstName = clean(body.first_name, 80)
  const lastName  = clean(body.last_name,  80)
  const email     = clean(body.email,      200).toLowerCase()
  const country   = clean(body.country,    120)
  const buyerType = clean(body.buyer_type, 120)
  const financing = clean(body.financing,  120)
  const previous  = clean(body.previous,   120)
  const source    = clean(body.source,     200)
  const message   = clean(body.message,    4000)
  const locale    = clean(body.locale,     8) || 'en'

  if (!firstName || !lastName || !email || !country || !buyerType || !financing || !message) {
    return json(res, 400, { error: 'missing-required-fields' })
  }
  if (!isEmail(email))            return json(res, 400, { error: 'invalid-email' })
  const domain = email.split('@')[1] || ''
  if (DISPOSABLE_DOMAINS.has(domain)) return json(res, 400, { error: 'disposable-email' })

  const ip = getIp(req)
  if (!checkRate(ip)) return json(res, 429, { error: 'rate-limited' })

  const lead = {
    created_at:     new Date().toISOString(),
    type:           'private-showing',
    first_name:     firstName,
    last_name:      lastName,
    full_name:      `${firstName} ${lastName}`.trim(),
    email,
    country,
    buyer_type:     buyerType,
    financing,
    previous_purchases: previous || null,
    source:         source || null,
    message,
    locale,
    ip,
    user_agent:     String(req.headers['user-agent'] || '').slice(0, 300),
  }

  console.log('[contact-lead]', JSON.stringify({
    ts: lead.created_at, email, country, buyerType, financing,
  }))

  const emailRes = await sendInternalNotification(lead).catch(err => {
    console.error('[contact] email exception', err)
    return { ok: false, sent: false }
  })

  return json(res, 200, { ok: true, emailed: !!emailRes?.sent })
}

// ── Notification email to the property rep
async function sendInternalNotification(lead) {
  if (!RESEND_KEY) {
    console.log('[contact] resend not configured — would notify', TO_INTERNAL)
    return { ok: true, sent: false, reason: 'resend-not-configured' }
  }
  const subject = `New Private Showing Inquiry — ${lead.full_name}`
  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#fafaf7;padding:32px;color:#1a1a1a">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8e3d3">
  <div style="padding:24px 32px;border-bottom:1px solid #e8e3d3">
    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:600">New Private Showing Inquiry</p>
    <p style="margin:6px 0 0;font-size:13px;color:#7a7a7a">Submitted ${escapeHtml(new Date(lead.created_at).toUTCString())}</p>
  </div>
  <div style="padding:24px 32px">
    <h2 style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#1a1a1a">${escapeHtml(lead.full_name)}</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.7;color:#3a3a3a">
      ${row('Email',    `<a href="mailto:${escapeHtml(lead.email)}" style="color:#c9a84c">${escapeHtml(lead.email)}</a>`)}
      ${row('Country',  escapeHtml(lead.country))}
      ${row('Buyer',    escapeHtml(lead.buyer_type))}
      ${row('Financing',escapeHtml(lead.financing))}
      ${lead.previous_purchases ? row('Prior $1M+ Purchases', escapeHtml(lead.previous_purchases)) : ''}
      ${lead.source    ? row('Source',  escapeHtml(lead.source))   : ''}
      ${row('Locale',   escapeHtml(lead.locale))}
      ${row('IP',       escapeHtml(lead.ip || '—'))}
    </table>
    <div style="margin-top:20px;padding:16px 18px;background:#fafaf7;border-left:3px solid #c9a84c">
      <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#3a3a3a;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    </div>
  </div>
  <div style="padding:16px 32px;background:#0a0a0a;text-align:center">
    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55)">Caracas Luxury Estate · Strictly Confidential</p>
  </div>
</div></body></html>`

  const text = [
    `NEW PRIVATE SHOWING INQUIRY`,
    `Submitted ${new Date(lead.created_at).toUTCString()}`,
    ``,
    `Name:      ${lead.full_name}`,
    `Email:     ${lead.email}`,
    `Country:   ${lead.country}`,
    `Buyer:     ${lead.buyer_type}`,
    `Financing: ${lead.financing}`,
    lead.previous_purchases ? `Prior:     ${lead.previous_purchases}` : '',
    lead.source ? `Source:    ${lead.source}` : '',
    `Locale:    ${lead.locale}`,
    `IP:        ${lead.ip || '—'}`,
    ``,
    `Message:`,
    lead.message,
  ].filter(Boolean).join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to:   [TO_INTERNAL],
        reply_to: lead.email,
        subject, html, text,
      }),
    })
    if (!r.ok) {
      const t = await r.text()
      console.error('[contact] resend error', r.status, t)
      return { ok: false, sent: false, error: t }
    }
    return { ok: true, sent: true }
  } catch (err) {
    console.error('[contact] resend exception', err)
    return { ok: false, sent: false, error: String(err) }
  }
}

// ── Helpers
function clean(v, max = 200) {
  if (v == null) return ''
  return String(v).replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}
function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) }
function getIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  return xf || req.socket?.remoteAddress || ''
}
function checkRate(ip) {
  if (!ip) return true
  const now = Date.now()
  const arr = (RATE.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_MAX) { RATE.set(ip, arr); return false }
  arr.push(now); RATE.set(ip, arr)
  return true
}
function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify(payload))
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', c => { data += c; if (data.length > 1e6) req.destroy() })
    req.on('end',  () => { try { resolve(data ? JSON.parse(data) : {}) } catch (e) { reject(e) } })
    req.on('error', reject)
  })
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]))
}
function row(label, value) {
  return `<tr><td style="padding:6px 0;width:160px;color:#7a7a7a;font-size:12px;letter-spacing:1px;text-transform:uppercase">${escapeHtml(label)}</td><td style="padding:6px 0">${value}</td></tr>`
}
