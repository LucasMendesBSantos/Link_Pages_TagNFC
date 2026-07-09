const { createClient } = require('@supabase/supabase-js')

let client = null

function getClient() {
  if (!client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_KEY
    if (!url || !key) throw new Error('SUPABASE_URL e SUPABASE_KEY não configuradas no Vercel')
    client = createClient(url, key)
  }
  return client
}

module.exports = { getClient }
