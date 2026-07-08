const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function registerVisitor(name, company) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, company }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro ao registrar')
  }
  return res.json()
}

export function trackAction(action) {
  try {
    const visitor = JSON.parse(sessionStorage.getItem('nfc_visitor') || 'null')
    if (!visitor) return
    fetch(`${API_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorName: visitor.name,
        visitorCompany: visitor.company,
        action,
      }),
    }).catch(() => {})
  } catch {
    // silently ignore
  }
}

export async function getSecretData() {
  const res = await fetch(`${API_URL}/api/secret/data`)
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}
