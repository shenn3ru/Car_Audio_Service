import React, { useState } from 'react';
import { useLang } from '../context/LangContext';
import '../styles/Gallery.css';

const GALLERY_SRCS = [
  '/gallery/g1.png',
  '/gallery/g2.png',
  '/gallery/g3.png',
  '/gallery/g4.png',
  '/gallery/g5.png',
];

export default function Gallery() {
  const { t } = useLang();

  const galleryItems = GALLERY_SRCS.map((src, i) => ({
    id: i + 1,
    cat: 'multimedia',
    src,
    title: t.gallery[`item${i + 1}`],
  }));
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-content fade-up">
            <h1>{t.gallery.title}</h1>
            <p>{t.gallery.subtitle}</p>
            <span className="accent-line" />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* GRID */}
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className="gallery-item fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => setLightbox(item)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{item.title}</span>
                  <span className="gallery-zoom">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <p>{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}