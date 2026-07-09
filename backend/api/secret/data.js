const supabase = require('../../lib/supabase')

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = async (req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const [{ data: visitors, error: ve }, { data: events, error: ee }] = await Promise.all([
      supabase.from('visitors').select('*').order('visited_at', { ascending: false }),
      supabase.from('events').select('*').order('timestamp', { ascending: false }),
    ])

    if (ve) throw ve
    if (ee) throw ee

    const toEntry = e => ({
      id: e.id,
      visitorName: e.visitor_name,
      visitorCompany: e.visitor_company,
      action: e.action,
      timestamp: e.timestamp,
    })

    return res.status(200).json({
      visitors: visitors.map(v => ({
        id: v.id,
        visitorName: v.name,
        visitorCompany: v.company,
        timestamp: v.visited_at,
      })),
      sggAccess:      events.filter(e => e.action === 'sgg_access').map(toEntry),
      curriculoAccess: events.filter(e => e.action === 'curriculo_access').map(toEntry),
      pdfView:        events.filter(e => e.action === 'pdf_view').map(toEntry),
      pdfDownload:    events.filter(e => e.action === 'pdf_download').map(toEntry),
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
