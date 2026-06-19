/**
 * POST /api/admin/upload-dossier
 * Receives a multipart PDF, uploads it to Vercel Blob (private),
 * then updates DOSSIER_BLOB_URL via Vercel API.
 *
 * Fields:
 *   file     — the PDF file
 *   password — must match ADMIN_UPLOAD_PASSWORD env var
 */

import { put } from '@vercel/blob'

export const config = { api: { bodyParser: false } }

async function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end', () => {
      const buf = Buffer.concat(chunks)
      const ct  = req.headers['content-type'] || ''
      const m   = ct.match(/boundary=(.+)$/)
      if (!m) return reject(new Error('No boundary found'))
      const boundary = '--' + m[1].trim()
      const parts    = {}
      const raw      = buf.toString('binary')
      const sections = raw.split(boundary).slice(1)

      for (const section of sections) {
        if (section.trim() === '--' || section.trim() === '--\r\n') continue
        const sepIdx = section.indexOf('\r\n\r\n')
        if (sepIdx === -1) continue
        const header  = section.slice(0, sepIdx)
        const content = section.slice(sepIdx + 4, section.endsWith('\r\n') ? -2 : section.length)

        const nameM     = header.match(/name="([^"]+)"/)
        const fileNameM = header.match(/filename="([^"]+)"/)
        if (!nameM) continue

        const name = nameM[1]
        if (fileNameM) {
          parts[name] = { filename: fileNameM[1], data: Buffer.from(content, 'binary') }
        } else {
          parts[name] = content.replace(/\r\n$/, '')
        }
      }
      resolve(parts)
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const ADMIN_PASSWORD = process.env.ADMIN_UPLOAD_PASSWORD
  if (!ADMIN_PASSWORD) {
    console.error('[upload-dossier] ADMIN_UPLOAD_PASSWORD not set')
    return res.status(500).json({ ok: false, error: 'Server misconfiguration' })
  }

  let parts
  try {
    parts = await parseMultipart(req)
  } catch (err) {
    console.error('[upload-dossier] parse error', err)
    return res.status(400).json({ ok: false, error: 'Failed to parse upload' })
  }

  // Authenticate
  const password = typeof parts.password === 'string' ? parts.password : ''
  if (password !== ADMIN_PASSWORD) {
    console.warn('[upload-dossier] wrong password attempt')
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  // Validate file
  const filePart = parts.file
  if (!filePart || !filePart.data || filePart.data.length < 100) {
    return res.status(400).json({ ok: false, error: 'No PDF file received' })
  }

  console.log('[upload-dossier] uploading', filePart.filename, filePart.data.length, 'bytes')

  try {
    const blob = await put(
      'dossier/caracas-luxury-estate-dossier.pdf',
      filePart.data,
      {
        access: 'public',
        contentType: 'application/pdf',
        addRandomSuffix: false,
        allowOverwrite: true,
      }
    )

    console.log('[upload-dossier] success', blob.url)

    // Update DOSSIER_BLOB_URL env var via Vercel API if token available
    const vercelToken   = process.env.VERCEL_ACCESS_TOKEN
    const vercelProject = process.env.VERCEL_PROJECT_ID || process.env.VERCEL_URL?.split('.')[0]
    const vercelTeam    = process.env.VERCEL_TEAM_ID

    if (vercelToken && vercelProject) {
      try {
        const teamQ = vercelTeam ? `?teamId=${vercelTeam}` : ''
        await fetch(`https://api.vercel.com/v9/projects/${vercelProject}/env${teamQ}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${vercelToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'DOSSIER_BLOB_URL',
            value: blob.url,
            type: 'plain',
            target: ['production', 'preview', 'development'],
          }),
        })
        console.log('[upload-dossier] env updated')
      } catch (envErr) {
        console.warn('[upload-dossier] env update failed (non-fatal)', envErr.message)
      }
    }

    return res.status(200).json({ ok: true, url: blob.url })
  } catch (err) {
    console.error('[upload-dossier] blob error', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
