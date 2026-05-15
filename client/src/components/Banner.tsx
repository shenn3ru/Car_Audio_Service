import { useState, useEffect } from 'react'

const slides = [
  {
    bg: '/image/banner 1.jpg',
    title: 'Expertiza ta în sisteme auto & multimedia',
    subtitle: 'Instalare profesională, garanție inclusă',
  },
  {
    bg: '/image/banner 2.jpg',
    title: 'Reparații rapide și profesionale',
    subtitle: 'Diagnosticare gratuită la prima vizită',
  },
  {
    bg: '/image/banner 3.jpg',
    title: 'Sisteme audio premium pentru mașina ta',
    subtitle: 'Peste 20 de ani de experiență',
  },
  {
    bg: '/image/banner 4.jpg',
    title: 'Multimedia, CarPlay, Android Auto',
    subtitle: 'Toate mărcile auto, toate modelele',
  },
]

interface BannerProps {
  onBookClick: () => void
}

export default function Banner({ onBookClick }: BannerProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="banner">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide${i === current ? ' active' : ''}`}
          style={{ backgroundImage: `url('${slide.bg}')` }}
        >
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <div className="slide-btns">
              <button className="hero-btn" onClick={onBookClick}>
                Programează-te
              </button>
              <a href="#servicii" className="hero-btn-outline">
                Vezi servicii
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <button
        className="slide-arrow prev"
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        aria-label="Previous"
      >‹</button>
      <button
        className="slide-arrow next"
        onClick={() => setCurrent(c => (c + 1) % slides.length)}
        aria-label="Next"
      >›</button>
    </div>
  )
}
