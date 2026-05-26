/* api/dossier.js — POST /api/dossier
   Receives the lead, validates, persists, and emails a signed link.
   Vercel Function (Node.js runtime). */

import { saveLead }          from './_lib/leads.js'
import { sendDossierEmail, sendLeadNotification }  from './_lib/email.js'
import { buildDownloadUrl }  from './_lib/blob.js'

const ALLOWED_CATEGORIES = new Set([
  'private',     // Private Individual / Family
  'family',      // Family Office
  'diplomatic',  // Diplomatic Mission / Embassy
  'corporate',   // Corporate
])
const ALLOWED_TIMELINES = new Set(['immediate', '3-6', '6-12', 'exploring'])
const ALLOWED_LOCALES   = new Set(['en', 'es', 'de'])

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','tempmail.com','guerrillamail.com','10minutemail.com',
  'yopmail.com','trashmail.com','sharklasers.com','dispostable.com',
  'getnada.com','throwawaymail.com','maildrop.cc','fakeinbox.com',
])

// In-memory rate limit (fine for low volume; swap for Upstash later)
const RATE = new Map() // ip -> [timestamps]
const RATE_WINDOW_MS = 60 * 60 * 1000   // 1h
const RATE_MAX       = 3                // 3 requests / hour / IP

export default async function handler(req, res) {
  // CORS & method
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST')    return json(res, 405, { error: 'method-not-allowed' })

  // ── Parse body (Vercel parses JSON automatically when content-type is set)
  let body = req.body
  if (!body || typeof body === 'string') {
    try { body = body ? JSON.parse(body) : await readJson(req) } catch { body = {} }
  }
  body = body || {}

  // ── Honeypot
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    // Silently accept so bots don't learn anything.
    return json(res, 200, { ok: true })
  }

  // ── Validate
  const fullName = clean(body.full_name, 120)
  const email    = clean(body.email,     200).toLowerCase()
  const country  = clean(body.country,   80)
  const category = clean(body.buyer_category, 40).toLowerCase()
  const timeline = clean(body.timeline,  20).toLowerCase()
  const consent  = body.consent === true || body.consent === 'true'
  const locale   = ALLOWED_LOCALES.has(body.locale) ? body.locale : 'en'

  const errors = []
  if (fullName.length < 2)              errors.push('full_name')
  if (!isEmail(email))                  errors.push('email')
  if (country.length < 2)               errors.push('country')
  if (!ALLOWED_CATEGORIES.has(category))errors.push('buyer_category')
  if (!ALLOWED_TIMELINES.has(timeline)) errors.push('timeline')
  if (!consent)                         errors.push('consent')
  if (errors.length) return json(res, 400, { error: 'validation', fields: errors })

  const domain = email.split('@')[1] || ''
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return json(res, 400, { error: 'disposable-email' })
  }

  // ── Rate limit
  const ip = getIp(req)
  if (!checkRate(ip)) {
    return json(res, 429, { error: 'rate-limited' })
  }

  // ── Build tracked download link
  const { url: downloadUrl, expiresAt } = buildDownloadUrl(email)

  // ── Persist (logs always, Supabase if configured)
  const lead = {
    created_at:     new Date().toISOString(),
    full_name:      fullName,
    email,
    country,
    buyer_category: category,
    timeline,
    locale,
    ip,
    user_agent:     String(req.headers['user-agent'] || '').slice(0, 400),
    utm_source:     clean(body.utm_source,   80) || null,
    utm_medium:     clean(body.utm_medium,   80) || null,
    utm_campaign:   clean(body.utm_campaign, 80) || null,
    download_token: downloadUrl.split('t=')[1] || null,
  }
  await saveLead(lead)

  // ── Send email (logs always, Resend if configured)
  await sendDossierEmail({ to: email, fullName, downloadUrl, expiresHours: 72 })

  // ── Notify owner of the new lead (fire-and-forget, never block the response)
  sendLeadNotification(lead).catch(err => console.error('[lead-notify]', err))

  // Done — never echo the download URL in the response (force email verification)
  return json(res, 200, { ok: true, expiresAt })
}

/* ─── helpers ─── */

function json(res, code, body) {
  res.status(code).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

async function readJson(req) {
  return await new Promise((resolve, reject) => {
    let data = ''
    req.on('data', c => { data += c; if (data.length > 64 * 1024) req.destroy() })
    req.on('end',  () => { try { resolve(data ? JSON.parse(data) : {}) } catch (e) { reject(e) } })
    req.on('error', reject)
  })
}

function clean(v, max) {
  if (v == null) return ''
  return String(v).replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 200
}

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function checkRate(ip) {
  const now = Date.now()
  const arr = (RATE.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_MAX) { RATE.set(ip, arr); return false }
  arr.push(now); RATE.set(ip, arr); return true
}
