import './LinkButton.css'

export function LinkButton({ href, icon, children, onTrack }) {
  function handleClick(e) {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple-effect'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top  = `${e.clientY - rect.top}px`
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    if (onTrack) onTrack()
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-btn"
      onClick={handleClick}
    >
      {icon && <span className="link-btn__icon" aria-hidden="true">{icon}</span>}
      <span className="link-btn__label">{children}</span>
      {/* Faixa de preenchimento líquido — animada pelo CSS no :hover */}
      <span className="link-btn__fill" aria-hidden="true" />
    </a>
  )
}
