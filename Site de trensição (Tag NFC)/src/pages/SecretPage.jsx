import { useState, useEffect } from 'react'
import { getSecretData } from '../api'
import { WaterBackground } from '../components/WaterBackground'
import './SecretPage.css'

function formatDate(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function AccessTable({ title, icon, entries, emptyMsg, showAction = false }) {
  return (
    <section className="secret-section">
      <h2 className="secret-section__title">
        <span className="secret-section__icon">{icon}</span>
        {title}
        <span className="secret-section__count">{entries.length}</span>
      </h2>

      {entries.length === 0 ? (
        <p className="secret-empty">{emptyMsg}</p>
      ) : (
        <div className="secret-table-wrapper">
          <table className="secret-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                {showAction && <th>Ação</th>}
                <th>Data / Hora</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.visitorName}</td>
                  <td>{entry.visitorCompany || '—'}</td>
                  {showAction && (
                    <td>
                      <span className={`secret-badge secret-badge--${entry.action}`}>
                        {entry.action === 'pdf_view' ? '👁 Visualizou' : '⬇ Baixou'}
                      </span>
                    </td>
                  )}
                  <td className="secret-date">{formatDate(entry.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default function SecretPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSecretData()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const pdfEntries = data
    ? [...data.pdfView, ...data.pdfDownload].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    : []

  return (
    <div className="page secret-page">
      <WaterBackground />

      <main className="secret-main">
        <header className="secret-header">
          <div className="secret-header__badge">🔒</div>
          <h1 className="secret-header__title">Painel de Acessos</h1>
          <p className="secret-header__sub">Registro de visitas ao site</p>
        </header>

        {loading && <p className="secret-loading">Carregando dados...</p>}

        {error && (
          <p className="secret-error">
            Não foi possível carregar os dados.<br />
            <small>{error}</small>
          </p>
        )}

        {data && (
          <div className="secret-sections">
            <AccessTable
              title="Programa SGG"
              icon="🚀"
              entries={data.sggAccess}
              emptyMsg="Nenhum acesso registrado ainda."
            />
            <AccessTable
              title="Currículo Virtual Lucas Mendes"
              icon="🌐"
              entries={data.curriculoAccess}
              emptyMsg="Nenhum acesso registrado ainda."
            />
            <AccessTable
              title="Currículo em PDF"
              icon="📑"
              entries={pdfEntries}
              emptyMsg="Nenhuma visualização ou download registrado ainda."
              showAction
            />
          </div>
        )}
      </main>
    </div>
  )
}
