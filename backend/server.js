require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const app = express()
app.use(cors())
app.use(express.json())

// Em produção (Vercel), apenas /tmp permite escrita. Em desenvolvimento, usa a pasta local.
const DATA_DIR = process.env.NODE_ENV === 'production'
  ? '/tmp/nfc-data'
  : path.join(__dirname, 'data')

const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json')
const EVENTS_FILE = path.join(DATA_DIR, 'events.json')

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(VISITORS_FILE)) fs.writeFileSync(VISITORS_FILE, '[]')
  if (!fs.existsSync(EVENTS_FILE)) fs.writeFileSync(EVENTS_FILE, '[]')
}

function readJSON(file) {
  ensureFiles()
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJSON(file, data) {
  ensureFiles()
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API Garrafão Rosa D\'água online' })
})

app.post('/api/register', (req, res) => {
  const { name, company } = req.body
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

  res.json({ success: true, visitor })
})

app.post('/api/track', (req, res) => {
  const { visitorName, visitorCompany, action } = req.body
  const validActions = ['sgg_access', 'curriculo_access', 'pdf_view', 'pdf_download']

  if (!visitorName?.trim() || !validActions.includes(action)) {
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

  res.json({ success: true })
})

app.get('/api/secret/data', (req, res) => {
  const events = readJSON(EVENTS_FILE)

  res.json({
    sggAccess: events.filter(e => e.action === 'sgg_access'),
    curriculoAccess: events.filter(e => e.action === 'curriculo_access'),
    pdfView: events.filter(e => e.action === 'pdf_view'),
    pdfDownload: events.filter(e => e.action === 'pdf_download'),
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

if (require.main === module) {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`))
}

module.exports = app
