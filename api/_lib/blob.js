/* api/_lib/blob.js
   Signed download URL for the dossier PDF.
   ─────────────────────────────────────────────
   Backs the three promises shown on /dossier:
     1. "Unique to you"            → token embeds a unique leadId
     2. "Cryptographically signed" → HMAC-SHA256 with DOSSIER_SECRET,
                                      verified in constant time (timingSafeEqual)
     3. "Expires in 72 hours"      → expiresAt encoded inside the signed payload

   ACTIVATION (Vercel Blob):
     1. In Vercel dashboard → Storage → Create Blob store.
     2. Upload the final PDF privately. Note its blob URL.
     3. Set DOSSIER_BLOB_URL to that URL.
     4. Set BLOB_READ_WRITE_TOKEN (auto-injected when the store is connected).
     5. Set DOSSIER_SECRET (min 32 chars). Generate with:
          node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

   Until activated, we still generate a tracked link back to a placeholder
   PDF on the same site (/assets/dossier-placeholder.pdf). The token-based
   URL allows tracking who clicked and enforces the 72h expiry.
   ───────────────────────────────────────────── */

import crypto from 'node:crypto'
import { createDossierToken, verifyDossierToken } from './token.js'

const PUBLIC_BASE      = process.env.PUBLIC_BASE_URL     || 'https://caracasluxuryestate.com'
const DOSSIER_BLOB_URL = process.env.DOSSIER_BLOB_URL    || ''
const PLACEHOLDER_URL  = '/assets/dossier-placeholder.pdf'
const EXPIRY_HOURS     = 72
const EXPIRY_MS        = EXPIRY_HOURS * 3600 * 1000

/**
 * Create a signed token (delegates to ./token.js which uses HMAC-SHA256 +
 * constant-time comparison). Each token embeds a unique leadId so two
 * submissions from the same email get different links.
 */
export function createDownloadToken(email, { leadId } = {}) {
  const id = leadId || crypto.randomUUID()
  const token = createDossierToken({ email, leadId: id, ttlMs: EXPIRY_MS })
  const expiresAt = new Date(Date.now() + EXPIRY_MS).toISOString()
  return { token, expiresAt, leadId: id }
}

/**
 * Verify an incoming download token. Returns one of:
 *   { ok: true,  email, leadId, expiresAt }
 *   { ok: false, reason: 'expired' | 'invalid_signature' | 'malformed' | 'server_misconfigured' }
 */
export function verifyDownloadToken(token) {
  const r = verifyDossierToken(token)
  if (!r.ok) return { ok: false, reason: r.reason }
  return {
    ok: true,
    email:     r.payload.email,
    leadId:    r.payload.leadId,
    expiresAt: new Date(r.payload.expiresAt).toISOString(),
  }
}

/**
 * Build the full URL that the user receives in the email.
 * /api/dossier/download verifies the token and 302-redirects to the private
 * blob URL (or to the placeholder PDF while DOSSIER_BLOB_URL is unset).
 */
export function buildDownloadUrl(email, { leadId } = {}) {
  const { token, expiresAt, leadId: id } = createDownloadToken(email, { leadId })
  const url = `${PUBLIC_BASE}/api/dossier/download?t=${encodeURIComponent(token)}`
  return { url, expiresAt, leadId: id }
}

/**
 * Resolves the actual file URL that download.js will redirect to once
 * the token has been verified. Returns the placeholder while not configured.
 */
export function resolveDossierTarget() {
  return DOSSIER_BLOB_URL || `${PUBLIC_BASE}${PLACEHOLDER_URL}`
}
