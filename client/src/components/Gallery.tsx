import { useState } from 'react'

const images = [
  { src: '/image/r1.jpg', alt: 'Instalare multimedia' },
  { src: '/image/r2.jpg', alt: 'Sistem audio premium' },
  { src: '/image/r3.jpg', alt: 'Electronica auto' },
  { src: '/image/audio auto.jpg', alt: 'Audio auto' },
  { src: '/image/multimedia auto.jpg', alt: 'Multimedia' },
  { src: '/image/oem.png', alt: 'Premium OEM' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : null)
  const next = () => setLightbox(i => i !== null ? (i + 1) % images.length : null)

  return (
    <div className="gallery-section">
      <div className="section-header">
        <h2>Galerie</h2>
        <p>Lucrări realizate de echipa noastră</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => setLightbox(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gallery-overlay">
              <span>🔍 Mărește</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>×</button>
          <button className="lb-prev" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            onClick={e => e.stopPropagation()}
          />
          <button className="lb-next" onClick={e => { e.stopPropagation(); next() }}>›</button>
          <div className="lb-counter">{lightbox + 1} / {images.length}</div>
        </div>
      )}
    </div>
  )
}
