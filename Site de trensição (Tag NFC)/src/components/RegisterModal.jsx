import { useState } from 'react'
import { registerVisitor } from '../api'
import './RegisterModal.css'

export function RegisterModal({ onSuccess }) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedCompany = company.trim()
    if (!trimmedName || !trimmedCompany) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await registerVisitor(trimmedName, trimmedCompany)
      onSuccess({ name: data.visitor.name, company: data.visitor.company })
    } catch (err) {
      setError(err.message || 'Erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card">
        <div className="modal-avatar">💧</div>
        <h2 id="modal-title" className="modal-title">Bem-vindo!</h2>
        <p className="modal-subtitle">Informe seus dados para acessar a página.</p>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="modal-field">
            <label htmlFor="visitor-name" className="modal-label">Nome</label>
            <input
              id="visitor-name"
              type="text"
              className="modal-input"
              placeholder="Seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="modal-field">
            <label htmlFor="visitor-company" className="modal-label">Empresa</label>
            <input
              id="visitor-company"
              type="text"
              className="modal-input"
              placeholder="Nome da empresa"
              value={company}
              onChange={e => setCompany(e.target.value)}
              disabled={loading}
              autoComplete="organization"
            />
          </div>

          {error && <p className="modal-error" role="alert">{error}</p>}

          <button type="submit" className="modal-submit" disabled={loading}>
            <span>{loading ? 'Aguarde...' : 'Acessar'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
