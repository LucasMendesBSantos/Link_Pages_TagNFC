const { createClient } = require('@supabase/supabase-js')

const VALID_ACTIONS = ['sgg_access', 'curriculo_access', 'pdf_view', 'pdf_download']

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const { visitorName, visitorCompany, action } = req.body ?? {}
    if (!visitorName?.trim() || !VALID_ACTIONS.includes(action)) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase não configurado no servidor' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase
      .from('events')
      .insert({
        visitor_name: visitorName.trim(),
        visitor_company: visitorCompany?.trim() ?? '',
        action,
      })

    if (error) throw error

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Erro interno do servidor' })
  }
}
