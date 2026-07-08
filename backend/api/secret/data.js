const { EVENTS_FILE, readJSON } = require('../../lib/storage')

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = (req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const events = readJSON(EVENTS_FILE)
    return res.status(200).json({
      sggAccess: events.filter(e => e.action === 'sgg_access'),
      curriculoAccess: events.filter(e => e.action === 'curriculo_access'),
      pdfView: events.filter(e => e.action === 'pdf_view'),
      pdfDownload: events.filter(e => e.action === 'pdf_download'),
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
