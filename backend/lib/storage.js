const fs = require('fs')
const path = require('path')

const DATA_DIR = process.env.NODE_ENV === 'production'
  ? '/tmp/nfc-data'
  : path.join(__dirname, '..', 'data')

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

module.exports = { VISITORS_FILE, EVENTS_FILE, readJSON, writeJSON }
