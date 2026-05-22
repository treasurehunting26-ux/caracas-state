/* api/_lib/leads.js
   Lead persistence layer.
   ─────────────────────────────────────────────
   ACTIVATION: set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in Vercel env vars
   and create the table with the SQL at the bottom of this file.
   Until activated, leads are logged to stdout so the flow keeps working.
   ───────────────────────────────────────────── */

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const TABLE        = 'dossier_leads'

export async function saveLead(lead) {
  // Always log so that — even before Supabase is wired — every submission
  // is visible in Vercel function logs. Keep this; it's a safety net.
  console.log('[lead]', JSON.stringify({
    ts: lead.created_at,
    email: lead.email,
    country: lead.country,
    category: lead.buyer_category,
    timeline: lead.timeline,
  }))

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { ok: true, persisted: false, reason: 'supabase-not-configured' }
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        'apikey':         SUPABASE_KEY,
        'Authorization':  `Bearer ${SUPABASE_KEY}`,
        'Content-Type':   'application/json',
        'Prefer':         'return=representation',
      },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[lead] supabase error', res.status, text)
      return { ok: false, persisted: false, error: text }
    }
    return { ok: true, persisted: true }
  } catch (err) {
    console.error('[lead] supabase exception', err)
    return { ok: false, persisted: false, error: String(err) }
  }
}

/* ─────────────────────────────────────────────
   SQL to run once in Supabase SQL editor:

   create table public.dossier_leads (
     id              uuid primary key default gen_random_uuid(),
     created_at      timestamptz not null default now(),
     full_name       text not null,
     email           text not null,
     country         text not null,
     buyer_category  text not null,
     timeline        text not null,
     locale          text,
     ip              text,
     user_agent      text,
     utm_source      text,
     utm_medium      text,
     utm_campaign    text,
     downloaded_at   timestamptz,
     download_token  text
   );
   create index dossier_leads_email_idx on public.dossier_leads (email);
   create index dossier_leads_created_idx on public.dossier_leads (created_at desc);
   alter table public.dossier_leads enable row level security;
   -- No public policies: only the service_role key can read/write.
   ───────────────────────────────────────────── */
