/**
 * Signed token module — guarantees the three promises shown on /dossier:
 *
 *   1. "Unique to you"           -> each token embeds a unique leadId (UUID)
 *   2. "Cryptographically signed" -> HMAC-SHA256 with DOSSIER_SECRET
 *   3. "Expires in 72 hours"      -> expiresAt embedded in the payload, verified server-side
 *
 * Token format (URL-safe base64):
 *   base64url( JSON({ email, leadId, expiresAt }) ) + '.' + base64url(signature)
 *
 * Verification is done in constant time to prevent timing attacks.
 */

import crypto from 'node:crypto';

const TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

function getSecret() {
  const secret = process.env.DOSSIER_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'DOSSIER_SECRET env var missing or too short (min 32 chars). ' +
      'Generate one with: node -e "console.log(crypto.randomBytes(48).toString(\'hex\'))"'
    );
  }
  return secret;
}

function b64urlEncode(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest();
}

/**
 * Create a signed token for a verified lead.
 * Call this right after the lead is persisted to the DB (you have a leadId).
 */
export function createDossierToken({ email, leadId, ttlMs = TTL_MS }) {
  const secret = getSecret();
  const payload = {
    email: String(email).toLowerCase().trim(),
    leadId: String(leadId),
    expiresAt: Date.now() + ttlMs,
  };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64urlEncode(payloadStr);
  const sig = sign(payloadB64, secret);
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

/**
 * Verify a token. Returns { ok, payload } on success, { ok: false, reason } on failure.
 * Reasons: 'malformed' | 'invalid_signature' | 'expired'
 */
export function verifyDossierToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) {
    return { ok: false, reason: 'malformed' };
  }
  const [payloadB64, sigB64] = token.split('.');
  if (!payloadB64 || !sigB64) return { ok: false, reason: 'malformed' };

  let secret;
  try {
    secret = getSecret();
  } catch (err) {
    console.error('[dossier:token]', err.message);
    return { ok: false, reason: 'server_misconfigured' };
  }

  const expected = sign(payloadB64, secret);
  let provided;
  try {
    provided = b64urlDecode(sigB64);
  } catch {
    return { ok: false, reason: 'malformed' };
  }

  // Constant-time comparison — prevents timing attacks
  if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
    return { ok: false, reason: 'invalid_signature' };
  }

  let payload;
  try {
    payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
  } catch {
    return { ok: false, reason: 'malformed' };
  }

  if (!payload.expiresAt || Date.now() > payload.expiresAt) {
    return { ok: false, reason: 'expired' };
  }

  return { ok: true, payload };
}
