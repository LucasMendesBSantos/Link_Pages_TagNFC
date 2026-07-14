const { createClient } = require('@supabase/supabase-js')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const { name, company } = req.body ?? {}
    if (!name?.trim() || !company?.trim()) {
      return res.status(400).json({ error: 'Nome e empresa são obrigatórios' })
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase não configurado no servidor' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('visitors')
      .insert({ name: name.trim(), company: company.trim() })
      .select()
      .single()

    if (error) throw error

    return res.status(200).json({ success: true, visitor: data })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Erro interno do servidor' })
  }
}
