/* api/_lib/blob.js
   Signed download URL for the dossier PDF.
   ─────────────────────────────────────────────
   ACTIVATION (Vercel Blob):
     1. In Vercel dashboard → Storage → Create Blob store.
     2. Upload the final PDF privately. Note its blob URL.
     3. Set DOSSIER_BLOB_URL to that URL.
     4. Set BLOB_READ_WRITE_TOKEN (auto-injected when the store is connected).

   Until activated, we generate a tracked link back to a placeholder PDF
   path on the same site (/assets/dossier-placeholder.pdf).
   The token-based URL still allows tracking who clicked.
   ───────────────────────────────────────────── */

import { createHmac, randomBytes } from 'node:crypto'

const SECRET           = process.env.DOSSIER_LINK_SECRET || 'dev-only-replace-me-in-prod'
const PUBLIC_BASE      = process.env.PUBLIC_BASE_URL     || 'https://caracasluxuryestate.com'
const DOSSIER_BLOB_URL = process.env.DOSSIER_BLOB_URL    || ''
const PLACEHOLDER_URL  = '/assets/dossier-placeholder.pdf'
const EXPIRY_HOURS     = 72

export function createDownloadToken(email) {
  const exp   = Date.now() + EXPIRY_HOURS * 3600 * 1000
  const nonce = randomBytes(8).toString('hex')
  const payload = `${email}|${exp}|${nonce}`
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 32)
  // base64url(payload).sig
  const b64 = Buffer.from(payload).toString('base64url')
  return { token: `${b64}.${sig}`, expiresAt: new Date(exp).toISOString() }
}

export function verifyDownloadToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return { ok: false }
  const [b64, sig] = token.split('.')
  let payload
  try { payload = Buffer.from(b64, 'base64url').toString('utf8') } catch { return { ok: false } }
  const expected = createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 32)
  if (expected !== sig) return { ok: false, reason: 'bad-signature' }
  const [email, expStr] = payload.split('|')
  const exp = Number(expStr)
  if (!Number.isFinite(exp) || Date.now() > exp) return { ok: false, reason: 'expired' }
  return { ok: true, email, expiresAt: new Date(exp).toISOString() }
}

export function buildDownloadUrl(email) {
  const { token, expiresAt } = createDownloadToken(email)
  // /api/dossier/download?t=… verifies the token and 302-redirects to the
  // private blob URL (or placeholder while not configured).
  const url = `${PUBLIC_BASE}/api/dossier/download?t=${encodeURIComponent(token)}`
  return { url, expiresAt }
}

export function resolveDossierTarget() {
  // Returns the actual file URL that the download endpoint will redirect to.
  return DOSSIER_BLOB_URL || `${PUBLIC_BASE}${PLACEHOLDER_URL}`
}
