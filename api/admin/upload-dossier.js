/**
 * GET  /api/admin/upload-dossier?password=xxx
 *   → returns a Vercel Blob client upload token
 *
 * PUT  /api/admin/upload-dossier   (called by Vercel Blob client SDK — internal)
 *   → handled by handleUpload from @vercel/blob/client
 */

import { handleUpload } from '@vercel/blob/client'

const ADMIN_PASSWORD = process.env.ADMIN_UPLOAD_PASSWORD || ''

export default async function handler(req, res) {
  // ── GET: issue a client upload token after checking password ──────────────
  if (req.method === 'GET') {
    const password = req.query.password || ''
    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ ok: false, error: 'ADMIN_UPLOAD_PASSWORD not set' })
    }
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' })
    }
    // Return a simple OK — the client will call the POST route for the token
    return res.status(200).json({ ok: true })
  }

  // ── POST: Vercel Blob client upload handshake ─────────────────────────────
  if (req.method === 'POST') {
    try {
      const body = await new Promise((resolve, reject) => {
        let data = ''
        req.on('data', c => (data += c))
        req.on('end', () => {
          try { resolve(JSON.parse(data)) } catch (e) { reject(e) }
        })
        req.on('error', reject)
      })

      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname) => {
          // Validate password stored in pathname prefix we pass from client
          // pathname format: "PASS:::dossier/caracas-luxury-estate-dossier.pdf"
          const [pass, ...rest] = pathname.split(':::')
          if (!ADMIN_PASSWORD || pass !== ADMIN_PASSWORD) {
            throw new Error('Unauthorized')
          }
          return {
            pathname: rest.join(':::') || 'dossier/caracas-luxury-estate-dossier.pdf',
            allowedContentTypes: ['application/pdf'],
            maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
            addRandomSuffix: false,
          }
        },
        onUploadCompleted: async ({ blob }) => {
          console.log('[upload-dossier] upload completed', blob.url, blob.size)
        },
      })

      return res.status(200).json(jsonResponse)
    } catch (err) {
      console.error('[upload-dossier] handleUpload error', err.message)
      return res.status(400).json({ error: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
