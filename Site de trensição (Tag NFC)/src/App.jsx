import { useState } from 'react'
import './App.css'
import { WaterBackground } from './components/WaterBackground'
import { LinkButton }      from './components/LinkButton'
import { PdfSection }      from './components/PdfSection'
import { RegisterModal }   from './components/RegisterModal'
import { trackAction }     from './api'

// ─────────────────────────────────────────────────────────────────────────────
const LINKS = {
  mainProject:   'https://2-apresentacao-leao-tech-front-back.vercel.app/',                  
  virtualResume: 'https://curriculo-online-tech-quim.vercel.app',
}

const PROFILE = {
  name:    'Trabalho Leão Tech Full Stack',
  tagline: 'Lucas Mendes : Desenvolvedor/Tech Lead\nWanderson: Desenvolvedor',
  avatar:  '💧',
}
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [visitor, setVisitor] = useState(() => {
    try {
      const raw = sessionStorage.getItem('nfc_visitor')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  function handleRegister(visitorData) {
    sessionStorage.setItem('nfc_visitor', JSON.stringify(visitorData))
    setVisitor(visitorData)
  }

  return (
    <div className={`page${!visitor ? ' page--locked' : ''}`}>
      {/* Fundo animado: gradiente oceânico + bolhas + ondas */}
      <WaterBackground />

      {/* Modal de cadastro — exibido enquanto o visitante não se identificar */}
      {!visitor && <RegisterModal onSuccess={handleRegister} />}

      <main className="card" aria-hidden={!visitor || undefined}>
        {/* ── Cabeçalho ── */}
        <header className="card__header">
          <div className="card__avatar">
            <span className="card__avatar-icon">{PROFILE.avatar}</span>
          </div>
          <h1 className="card__name">{PROFILE.name}</h1>
          <p className="card__tagline">
            {PROFILE.tagline.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </p>
        </header>

        {/* ── Links principais ── */}
        <nav className="card__links" aria-label="Links principais">
          {/* Botão 1 — Projeto Principal */}
          <LinkButton
            href={LINKS.mainProject}
            icon="🚀"
            onTrack={() => trackAction('sgg_access')}
          >
            Programa SGG
          </LinkButton>

          {/* Botão 2 — Currículo Virtual (site hospedado) */}
          <LinkButton
            href={LINKS.virtualResume}
            icon="🌐"
            onTrack={() => trackAction('curriculo_access')}
          >
            Currículo Virtual Lucas Mendes
          </LinkButton>

          {/* Botão 3 — PDF: Visualizar + Baixar */}
          <PdfSection
            onViewPdf={() => trackAction('pdf_view')}
            onDownloadPdf={() => trackAction('pdf_download')}
          />
        </nav>
      </main>

      <footer className="footer" aria-hidden={!visitor || undefined}>
        <p>Lembre-se de se Hidratar 💧</p>
      </footer>
    </div>
  )
}
