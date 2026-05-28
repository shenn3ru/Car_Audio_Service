import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useLang } from '../context/LangContext';
import '../styles/Services.css';

const categoryColors = {
  multimedia:  '#2563eb',
  audio:       '#1d4ed8',
  electronic:  '#3b82f6',
  carplay:     '#1e40af',
  oem:         '#2563eb',
  accessories: '#1d4ed8',
};

const FALLBACK_SERVICES = [
  { id: 'f1', category: 'multimedia',  isDefault: true },
  { id: 'f2', category: 'audio',       isDefault: true },
  { id: 'f3', category: 'electronic',  isDefault: true },
  { id: 'f4', category: 'carplay',     isDefault: true },
  { id: 'f5', category: 'oem',         isDefault: true },
  { id: 'f6', category: 'accessories', isDefault: true },
];

export default function Services() {
  const { t } = useLang();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const snap = await getDocs(collection(db, 'services'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setServices(data.length > 0 ? data : FALLBACK_SERVICES);
      } catch (e) {
        console.error(e);
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

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
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div className="services-page-grid">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className="service-full-card card fade-up"
                  style={{ animationDelay: `${i * 0.1}s`, '--c': categoryColors[s.category] || '#2563eb' }}
                >
                  <span className="sfc-cat">{t.services[s.category] || s.category}</span>
                  <h3 className="sfc-title">
                    {s.isDefault ? t.services[s.category] : s.name}
                  </h3>
                  <p className="sfc-desc">
                    {s.isDefault ? t.services[s.category + 'Desc'] : s.description}
                  </p>
                  <Link to="/location" className="btn btn-primary sfc-btn">{t.services.bookService}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BRANDS BANNER */}
      <section className="brands-section">
        <div className="container">
          <h3>{t.services.brandsTitle}</h3>
          <div className="brands-list">
            {['BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Skoda', 'Seat', 'Porsche', 'Kia', 'Hyundai', 'Toyota'].map(b => (
              <span key={b} className="brand-tag">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta-box">
            <h2>{t.services.ctaTitle}</h2>
            <p>{t.services.ctaDesc}</p>
            <div className="cta-actions">
              <Link to="/location" className="btn btn-primary">{t.location.contactForm}</Link>
              <a href="tel:+37367571810" className="btn btn-outline">+373 67 571 810</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
