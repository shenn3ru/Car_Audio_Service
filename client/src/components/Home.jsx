import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import '../styles/Home.css';

const slides = [
  { bg: 'https://images.unsplash.com/photo-1546707539-a1b87e3f79de?w=1600&q=80', key: 'hero1' },
  { bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80', key: 'hero2' },
  { bg: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80', key: 'hero3' },
  { bg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=80', key: 'hero4' },
];

const stats = [
  { value: '20+', key: 'years' },
  { value: '5000+', key: 'clients' },
  { value: '12 luni', key: 'warranty' },
  { value: '50+', key: 'brands' },
];

const featuredServices = [
  { key: 'multimedia', color: '#2563eb' },
  { key: 'audio', color: '#1d4ed8' },
  { key: 'electronic', color: '#3b82f6' },
  { key: 'carplay', color: '#1e40af' },
  { key: 'oem', color: '#2563eb' },
  { key: 'accessories', color: '#1d4ed8' },
];

export default function Home() {
  const { t } = useLang();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* HERO SLIDER */}
      <section className="hero">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content fade-up">
          <div className="hero-tag">Car Audio Service — Chișinău</div>
          <h1 className="hero-title">{t.home[slides[activeSlide].key]}</h1>
          <div className="hero-cta">
            <Link to="/services" className="btn btn-primary">{t.home.cta}</Link>
            <Link to="/location" className="btn btn-outline">{t.home.contactUs}</Link>
          </div>
        </div>
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{t.home[s.key]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-us">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.whyUs}</h2>
            <span className="accent-line" />
          </div>
          <div className="features-grid">
            {[
              { title: '20+ ani experiență', desc: 'Tehnicieni certificați cu experiență vastă în toate mărcile premium' },
              { title: 'Serviciu rapid', desc: 'De regulă rezolvăm problema ta în aceeași zi, fără așteptare' },
              { title: 'Garanție 3-12 luni', desc: 'Garanție completă la toate lucrările și piesele montate' },
              { title: 'Prețuri corecte', desc: 'Transparență totală — diagnoză gratuită, fără costuri ascunse' },
              { title: 'Piese originale', desc: 'Utilizăm exclusiv piese originale și certificate OEM' },
              { title: 'Support 24/7', desc: 'Disponibili pe WhatsApp și Telegram pentru orice întrebare' },
            ].map((f, i) => (
              <div key={i} className="feature-card card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.featuredServices}</h2>
            <span className="accent-line" />
          </div>
          <div className="services-grid">
            {featuredServices.map((s, i) => (
              <Link to="/services" key={i} className="service-card fade-up" style={{ animationDelay: `${i * 0.08}s`, '--card-color': s.color }}>
                <h3>{t.services[s.key]}</h3>
                <p>{t.services[`${s.key}Desc`]}</p>
                <span className="service-arrow">→</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-primary">{t.home.cta}</Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Programează-te acum</h2>
            <p>Contactează-ne și rezolvăm problema ta auto rapid și profesional</p>
            <div className="cta-actions">
              <Link to="/location" className="btn btn-primary">{t.home.bookNow}</Link>
              <a href="tel:+37367571810" className="btn btn-outline">+373 67 571 810</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
