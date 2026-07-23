const API_URL = import.meta.env.VITE_API_URL ?? 'https://link-pages-tag-nfc-3z9h.vercel.app'

export async function registerVisitor(name, company) {
  try {
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
  } catch {
    return { visitor: { name, company } }
  }
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
