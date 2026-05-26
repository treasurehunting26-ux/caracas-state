/* api/_lib/email.js
   Transactional email layer (Resend).
   ─────────────────────────────────────────────
   ACTIVATION:
     1. Sign up at resend.com, verify the domain caracasluxuryestate.com
        (add SPF + DKIM records).
     2. Set RESEND_API_KEY in Vercel env vars.
     3. (Optional) Set DOSSIER_FROM and DOSSIER_REPLY_TO.
   Until activated, the email is logged and the flow continues.
   ───────────────────────────────────────────── */

const RESEND_KEY  = process.env.RESEND_API_KEY || ''
const FROM        = process.env.DOSSIER_FROM     || 'Caracas Luxury Estate <dossier@caracasluxuryestate.com>'
const REPLY_TO    = process.env.DOSSIER_REPLY_TO || 'contact@caracasluxuryestate.com'

export async function sendDossierEmail({ to, fullName, downloadUrl, expiresHours = 72 }) {
  const subject = 'Your Investment & Security Dossier — Caracas Luxury Estate'
  const html    = renderDossierEmail({ fullName, downloadUrl, expiresHours })
  const text    = renderDossierEmailText({ fullName, downloadUrl, expiresHours })

  if (!RESEND_KEY) {
    console.log('[email] resend not configured — would send to', to)
    return { ok: true, sent: false, reason: 'resend-not-configured' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: REPLY_TO,
        subject,
        html,
        text,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('[email] resend error', res.status, body)
      return { ok: false, sent: false, error: body }
    }
    return { ok: true, sent: true }
  } catch (err) {
    console.error('[email] resend exception', err)
    return { ok: false, sent: false, error: String(err) }
  }
}

function renderDossierEmail({ fullName, downloadUrl, expiresHours }) {
  const firstName = (fullName || '').split(' ')[0] || 'Sir/Madam'
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Dossier</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fafaf7">
        <tr><td style="padding:48px 48px 24px;border-bottom:1px solid #e8e3d3">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:600">Caracas Luxury Estate</p>
          <p style="margin:6px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7a7a7a">La Trinidad · Baruta · Caracas</p>
        </td></tr>
        <tr><td style="padding:40px 48px 24px">
          <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#1a1a1a;font-weight:400">Your Investment &amp;<br><em>Security Dossier</em></h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#3a3a3a">Dear ${escapeHtml(firstName)},</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#3a3a3a">Thank you for your interest in our private listing in Lomas de Chispia. As requested, the confidential <strong>Investment &amp; Security Dossier</strong> is available for your review at the secure link below.</p>
          <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#3a3a3a">This document contains the comprehensive overview of the estate, including property specifications, security infrastructure, autonomy systems, location analysis, and acquisition process.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto"><tr><td align="center" bgcolor="#c9a84c" style="background-color:#c9a84c;border-radius:2px">
            <a href="${downloadUrl}" target="_blank" style="background-color:#c9a84c;color:#0a0a0a;display:inline-block;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2.5px;text-decoration:none;text-transform:uppercase;padding:18px 44px;border:1px solid #c9a84c">Access the Dossier &rarr;</a>
          </td></tr></table>
          <p style="margin:24px 0 0;font-size:12px;line-height:1.7;color:#7a7a7a;text-align:center">If the button doesn&rsquo;t work, copy and paste this link into your browser:<br><a href="${downloadUrl}" style="color:#c9a84c;text-decoration:underline;word-break:break-all">${downloadUrl}</a></p>
          <p style="margin:32px 0 0;font-size:12px;line-height:1.7;color:#7a7a7a;text-align:center">This link is private to you and expires in ${expiresHours} hours.<br>Please do not forward this message.</p>
        </td></tr>
        <tr><td style="padding:24px 48px 40px;border-top:1px solid #e8e3d3">
          <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600">Next Step</p>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#3a3a3a">After reviewing the dossier, qualified buyers may request a private showing of the estate. All visits are by appointment only and handled with absolute discretion.</p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#7a7a7a">For any inquiries, simply reply to this email or write to <a href="mailto:${REPLY_TO}" style="color:#c9a84c;text-decoration:none">${REPLY_TO}</a>.</p>
        </td></tr>
        <tr><td style="padding:20px 48px;background:#0a0a0a;text-align:center">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55)">Strictly Confidential · Qualified Buyers Only</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function renderDossierEmailText({ fullName, downloadUrl, expiresHours }) {
  const firstName = (fullName || '').split(' ')[0] || 'Sir/Madam'
  return [
    `CARACAS LUXURY ESTATE`,
    `La Trinidad · Baruta · Caracas`,
    ``,
    `Dear ${firstName},`,
    ``,
    `Thank you for your interest in our private listing in Lomas de Chispia.`,
    `As requested, the confidential Investment & Security Dossier is available`,
    `at the secure link below:`,
    ``,
    downloadUrl,
    ``,
    `This link is private to you and expires in ${expiresHours} hours.`,
    `Please do not forward this message.`,
    ``,
    `For any inquiries, simply reply to this email or write to ${REPLY_TO}.`,
    ``,
    `— Caracas Luxury Estate`,
    `Strictly Confidential · Qualified Buyers Only`,
  ].join('\n')
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]))
}
