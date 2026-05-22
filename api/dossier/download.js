/* api/dossier/download.js — GET /api/dossier/download?t=…
   Verifies the signed token, then either redirects to the PDF
   (when DOSSIER_BLOB_URL is set) or serves an elegant "preparing" page. */

import { verifyDownloadToken } from '../_lib/blob.js'

const DOSSIER_BLOB_URL = process.env.DOSSIER_BLOB_URL || ''

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') return res.status(405).end('method-not-allowed')

  const url    = new URL(req.url, `http://${req.headers.host}`)
  const token  = url.searchParams.get('t') || ''
  const result = verifyDownloadToken(token)

  if (!result.ok) {
    // 410 Gone for expired (correct semantic), 403 for tampered/invalid
    const status = result.reason === 'expired' ? 410 : 403
    return sendPage(res, status, expiredPage(result.reason))
  }

  // TODO (when Supabase is wired): mark this lead as downloaded
  console.log('[dossier-download]', JSON.stringify({
    ts: new Date().toISOString(),
    email: result.email,
    blob_configured: Boolean(DOSSIER_BLOB_URL),
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
    ua: req.headers['user-agent'],
  }))

  if (DOSSIER_BLOB_URL) {
    res.writeHead(302, { Location: DOSSIER_BLOB_URL })
    return res.end()
  }

  // Fallback while the PDF is being finalised
  return sendPage(res, 200, preparingPage(result.email))
}

function sendPage(res, code, html) {
  res.status(code)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(html)
}

function shell(title, inner) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · Caracas Luxury Estate</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a0a0a;color:#fafaf7;font-family:'Montserrat',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px;line-height:1.6}
  .box{max-width:560px;text-align:center;border:1px solid rgba(201,168,76,.25);padding:56px 40px;background:rgba(255,255,255,.02);position:relative}
  .box::before,.box::after{content:'';position:absolute;width:24px;height:24px;border:1px solid #c9a84c}
  .box::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
  .box::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
  .tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:600;margin-bottom:18px}
  h1{font-family:'Cormorant Garamond',serif;font-size:38px;line-height:1.15;font-weight:400;color:#fafaf7;margin-bottom:20px}
  h1 em{font-style:italic;color:#c9a84c}
  p{font-size:14px;color:rgba(255,255,255,.72);margin-bottom:14px;font-weight:300}
  p.sm{font-size:12px;color:rgba(255,255,255,.5)}
  a.btn{display:inline-block;margin-top:24px;padding:14px 32px;border:1px solid #c9a84c;color:#c9a84c;text-decoration:none;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;transition:all .3s}
  a.btn:hover{background:#c9a84c;color:#0a0a0a}
  .seal{display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:500}
  .seal::before,.seal::after{content:'';width:24px;height:1px;background:rgba(201,168,76,.4)}
</style></head><body><div class="box">${inner}</div></body></html>`
}

function preparingPage(email) {
  return shell('Dossier in Preparation', `
    <div class="seal">Confidential</div>
    <p class="tag">Investment Dossier</p>
    <h1>Your Dossier is<br><em>Being Prepared</em></h1>
    <p>Thank you. Your request was successfully verified for the address ending in <strong>${maskEmail(email)}</strong>.</p>
    <p>Our team is finalising the latest revision of the confidential Investment &amp; Security Dossier. The complete document will be delivered to you by email within the next 24&nbsp;hours.</p>
    <p class="sm">For any urgent enquiry, reply directly to the email you received or write to info@caracasluxuryestate.com.</p>
    <a class="btn" href="/contact">Request Private Showing</a>
  `)
}

function expiredPage(reason) {
  const isExpired = reason === 'expired'
  return shell(isExpired ? 'Link Expired' : 'Invalid Link', `
    <p class="tag">${isExpired ? 'Link Expired' : 'Invalid Link'}</p>
    <h1>${isExpired ? 'This Link Has<br><em>Expired</em>' : 'Invalid<br><em>Link</em>'}</h1>
    <p>${isExpired
      ? 'For security, dossier links are valid for 72 hours after issue. You can request a fresh link below.'
      : 'This link could not be verified. Please request a new dossier from the form below.'}</p>
    <a class="btn" href="/dossier">Request New Dossier</a>
  `)
}

function maskEmail(e) {
  if (!e || !e.includes('@')) return ''
  const [u, d] = e.split('@')
  const masked = u.length <= 2 ? u[0] + '*' : u[0] + '*'.repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${masked}@${d}`
}
