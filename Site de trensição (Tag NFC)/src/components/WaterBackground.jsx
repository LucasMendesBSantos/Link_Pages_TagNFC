import { useEffect, useRef } from 'react'
import './WaterBackground.css'

const BUBBLE_COUNT = 18

export function WaterBackground() {
  const bubblesRef = useRef(null)

  useEffect(() => {
    const container = bubblesRef.current
    if (!container) return

    const created = Array.from({ length: BUBBLE_COUNT }, () => {
      const el = document.createElement('span')
      el.className = 'bubble'
      const size = Math.random() * 40 + 8
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 12}s;
        animation-duration: ${Math.random() * 8 + 8}s;
      `
      container.appendChild(el)
      return el
    })

    return () => created.forEach(el => el.remove())
  }, [])

  return (
    <div className="water-bg" aria-hidden="true">
      <div className="water-bg__gradient" />

      <div className="water-bg__caustics" />

      <div className="water-bg__bubbles" ref={bubblesRef} />

      {/* Camadas de ondas empilhadas no fundo — parallax pelo CSS */}
      <div className="water-bg__waves">
        <svg
          className="wave-svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g className="wave-parallax">
            <use href="#wave-path" x="48" y="0" fill="rgba(0,212,255,0.14)" />
            <use href="#wave-path" x="48" y="3" fill="rgba(0,180,220,0.10)" />
            <use href="#wave-path" x="48" y="5" fill="rgba(0,150,195,0.08)" />
            <use href="#wave-path" x="48" y="7" fill="rgba(10,37,64,0.92)"  />
          </g>
        </svg>
      </div>
    </div>
  )
}
