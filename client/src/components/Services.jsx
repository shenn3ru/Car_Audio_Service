import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import '../styles/Services.css';

const services = [
  {
    key: 'multimedia',
    color: '#2563eb',
    priceFrom: 300,
    features: ['Ecrane tactile 7-12 inch', 'Navigație GPS offline/online', 'Conexiune Bluetooth & WiFi', 'Camere 360° și parcare', 'Apple CarPlay / Android Auto'],
    time: '1-3 ore',
    warranty: '12 luni'
  },
  {
    key: 'audio',
    color: '#1d4ed8',
    priceFrom: 150,
    features: ['Difuzoare coaxiale și component', 'Amplificatoare clasa A/B/D', 'Subwoofere și cutii bass', 'Procesoare de sunet DSP', 'Sisteme Hi-Fi premium'],
    time: '2-5 ore',
    warranty: '12 luni'
  },
  {
    key: 'electronic',
    color: '#3b82f6',
    priceFrom: 200,
    features: ['Diagnosticare CAN bus', 'Reparații module ECU/BCM', 'Codare și programare unități', 'Interfețe OEM integrare', 'Eliminare coduri eroare'],
    time: '1-4 ore',
    warranty: '6 luni'
  },
  {
    key: 'carplay',
    color: '#1e40af',
    priceFrom: 400,
    features: ['CarPlay wireless și cu fir', 'Android Auto wireless', 'Mirrorlink compatibil', 'Activare funcții ascunse', 'Update software unitate'],
    time: '1-2 ore',
    warranty: '12 luni'
  },
  {
    key: 'oem',
    color: '#2563eb',
    priceFrom: 800,
    features: ['Upgrade sisteme BMW iDrive', 'Audi MMI full activation', 'Mercedes MBUX retrofit', 'Harman Kardon integration', 'Bang & Olufsen systems'],
    time: '3-8 ore',
    warranty: '12 luni'
  },
  {
    key: 'accessories',
    color: '#1d4ed8',
    priceFrom: 100,
    features: ['Camere HD față/spate', 'Senzori parcare ultrasonici', 'Dashcam 4K cu GPS', 'Alarme cu aplicație', 'Sisteme start/stop la distanță'],
    time: '1-3 ore',
    warranty: '6 luni'
  }
];

export default function Services() {
  const { t } = useLang();
  const [selected, setSelected] = useState(null);

  return (
    <div className="services-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="container">
          <div className="page-header-content fade-up">
            <h1>{t.services.title}</h1>
            <p>{t.services.subtitle}</p>
            <span className="accent-line" />
          </div>
        </div>
      </div>

      {/* SERVICES CARDS */}
      <section className="section">
        <div className="container">
          <div className="services-page-grid">
            {services.map((s, i) => (
              <div
                key={s.key}
                className="service-full-card card fade-up"
                style={{ animationDelay: `${i * 0.1}s`, '--c': s.color }}
              >
                <div className="sfc-header">
                  <div>
                    <h3>{t.services[s.key]}</h3>
                    <p className="sfc-price">De la <strong>{s.priceFrom} MDL</strong></p>
                  </div>
                </div>
                <p className="sfc-desc">{t.services[`${s.key}Desc`]}</p>
                <ul className="sfc-features">
                  {s.features.map((f, j) => (
                    <li key={j}><span className="check">✓</span>{f}</li>
                  ))}
                </ul>
                <div className="sfc-meta">
                  <span>⏱ {s.time}</span>
                  <span>🛡 {s.warranty}</span>
                </div>
                <Link to="/location" className="btn btn-primary">{t.services.bookService}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS BANNER */}
      <section className="brands-section">
        <div className="container">
          <h3>Marci auto deservite</h3>
          <div className="brands-list">
            {['BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Toyota', 'Honda', 'Volvo', 'Lexus', 'Porsche', 'Land Rover'].map(b => (
              <span key={b} className="brand-tag">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta-box">
            <h2>Nu găsești serviciul de care ai nevoie?</h2>
            <p>Contactează-ne și vom găsi cea mai bună soluție pentru mașina ta.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/location" className="btn btn-primary">{t.location?.contactForm || 'Contactează-ne'}</Link>
              <a href="tel:+37367571810" className="btn btn-outline">📞 +373 67 571 810</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}