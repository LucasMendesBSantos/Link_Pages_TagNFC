import './PdfSection.css'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURE O CAMINHO DO SEU PDF AQUI
// Se o arquivo estiver em /public/curriculo.pdf → use '/curriculo.pdf'
// Se for uma URL externa → use 'https://exemplo.com/meu-curriculo.pdf'
const PDF_PATH = '/curriculo.pdf'   // << TROQUE AQUI
// ─────────────────────────────────────────────────────────────────────────────

export function PdfSection({ onViewPdf, onDownloadPdf }) {
  return (
    <div className="pdf-section">
      <div className="pdf-section__header">
        <span aria-hidden="true">📑</span>
        <span>Currículo em PDF</span>
      </div>

      <div className="pdf-section__actions">
        {/* Ação A — abre o PDF em nova aba */}
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="pdf-btn pdf-btn--view"
          onClick={() => onViewPdf?.()}
        >
          <span className="pdf-btn__fill" aria-hidden="true" />
          <span className="pdf-btn__icon" aria-hidden="true">👁</span>
          <span>Visualizar</span>
        </a>

        {/* Ação B — força o download direto */}
        <a
          href={PDF_PATH}
          download
          className="pdf-btn pdf-btn--download"
          onClick={() => onDownloadPdf?.()}
        >
          <span className="pdf-btn__fill" aria-hidden="true" />
          <span className="pdf-btn__icon" aria-hidden="true">⬇</span>
          <span>Baixar</span>
        </a>
      </div>
    </div>
  )
}
