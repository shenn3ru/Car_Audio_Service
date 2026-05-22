import React, { useState } from 'react';
import { useLang } from '../context/LangContext';
import '../styles/Gallery.css';

const galleryItems = [
  { id: 1, cat: 'multimedia', src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80', title: 'Display Mercedes GLE' },
  { id: 2, cat: 'audio', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', title: 'Sistem audio BMW' },
  { id: 3, cat: 'multimedia', src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&q=80', title: 'CarPlay Audi A4' },
  { id: 4, cat: 'electronic', src: 'https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=600&q=80', title: 'Diagnosticare electronică' },
  { id: 5, cat: 'audio', src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80', title: 'Subwoofer instalat' },
  { id: 6, cat: 'multimedia', src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80', title: 'Navigație GPS VW' },
  { id: 7, cat: 'electronic', src: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?w=600&q=80', title: 'Reparație modul ECU' },
  { id: 8, cat: 'audio', src: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80', title: 'Amplificator premium' },
  { id: 9, cat: 'multimedia', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80', title: 'OEM upgrade BMW' },
];

const cats = ['all', 'multimedia', 'audio', 'electronic'];

export default function Gallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.cat === filter);

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
          {/* FILTERS */}
          <div className="gallery-filters">
            {cats.map(c => (
              <button
                key={c}
                className={`filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {t.gallery[c]}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
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
            <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.title} />
            <p>{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}