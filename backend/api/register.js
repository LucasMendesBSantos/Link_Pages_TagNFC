const { randomUUID } = require('crypto')
const { VISITORS_FILE, readJSON, writeJSON } = require('../lib/storage')

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = (req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const { name, company } = req.body ?? {}
    if (!name?.trim() || !company?.trim()) {
      return res.status(400).json({ error: 'Nome e empresa são obrigatórios' })
    }

    const visitor = {
      id: randomUUID(),
      name: name.trim(),
      company: company.trim(),
      visitedAt: new Date().toISOString(),
    }

    const visitors = readJSON(VISITORS_FILE)
    visitors.push(visitor)
    writeJSON(VISITORS_FILE, visitors)

    return res.status(200).json({ success: true, visitor })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
