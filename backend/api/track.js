const { randomUUID } = require('crypto')
const { EVENTS_FILE, readJSON, writeJSON } = require('../lib/storage')

const VALID_ACTIONS = ['sgg_access', 'curriculo_access', 'pdf_view', 'pdf_download']

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = (req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const { visitorName, visitorCompany, action } = req.body ?? {}
    if (!visitorName?.trim() || !VALID_ACTIONS.includes(action)) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const event = {
      id: randomUUID(),
      visitorName: visitorName.trim(),
      visitorCompany: visitorCompany?.trim() ?? '',
      action,
      timestamp: new Date().toISOString(),
    }

    const events = readJSON(EVENTS_FILE)
    events.push(event)
    writeJSON(EVENTS_FILE, events)

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
