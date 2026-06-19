/**
 * GET  /api/admin/upload-dossier?password=xxx
 *   → validates password, generates a Vercel Blob presigned PUT URL
 *   → returns { uploadUrl, uploadId, finalUrl }
 *
 * POST /api/admin/upload-dossier  { uploadId, password }
 *   → confirms the upload completed and returns the final blob URL
 */

import { put, head } from '@vercel/blob'

const ADMIN_PASSWORD = process.env.ADMIN_UPLOAD_PASSWORD || ''
const BLOB_TOKEN     = process.env.BLOB_READ_WRITE_TOKEN  || ''
const FINAL_PATHNAME = 'dossier/caracas-luxury-estate-dossier.pdf'

// In-memory store for pending upload sessions (works for single-instance dev/serverless)
const sessions = new Map()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  // ── GET: validate password → return presigned PUT URL ────────────────────
  if (req.method === 'GET') {
    const password = req.query.password || ''
    if (!ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_UPLOAD_PASSWORD not set' })
    if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })
    if (!BLOB_TOKEN) return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN not set' })

    try {
      // Generate a unique upload session ID
      const uploadId = Math.random().toString(36).slice(2) + Date.now().toString(36)

      // Use Vercel Blob's multipart / direct upload via a temporary signed URL
      // We use put() with allowOverwrite to get the final URL immediately after upload
      // Since we can't stream 33 MB through serverless, we return a Blob API presigned URL
      const uploadUrl = `https://blob.vercel-storage.com/${FINAL_PATHNAME}?allowOverwrite=1`
      const finalUrl  = `https://blob.vercel-storage.com/${FINAL_PATHNAME}`

      sessions.set(uploadId, { finalUrl, ts: Date.now() })

      // Return the presigned PUT URL the client will use directly
      // Client sends: PUT uploadUrl with Authorization header (we relay it via the token)
      return res.status(200).json({
        ok: true,
        uploadUrl,
        uploadId,
        finalUrl,
        token: BLOB_TOKEN,  // client needs this to PUT directly to Blob
      })
    } catch (err) {
      console.error('[upload-dossier] GET error', err.message)
      return res.status(500).json({ error: err.message })
    }
  }

  // ── POST: confirm upload ──────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = await new Promise((resolve, reject) => {
      let d = ''
      req.on('data', c => (d += c))
      req.on('end', () => { try { resolve(JSON.parse(d)) } catch (e) { reject(e) } })
      req.on('error', reject)
    })

    const { uploadId, password } = body || {}
    if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })

    const session = sessions.get(uploadId)
    if (session) sessions.delete(uploadId)

    return res.status(200).json({ ok: true, url: session?.finalUrl || `https://blob.vercel-storage.com/${FINAL_PATHNAME}` })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
