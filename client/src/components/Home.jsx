import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import '../styles/Home.css';

const slides = [
  { bg: 'https://autoimage.capitalone.com/cms/Auto/assets/images/2772-hero-5-things-that-made-interiors-better.jpg', key: 'hero1' },
  { bg: 'https://i.pinimg.com/1200x/3b/fc/a8/3bfca87e35932d6f7af3a95d4fb7669b.jpg', key: 'hero2' },
  { bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80', key: 'hero3' },
  { bg: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80', key: 'hero4' },
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

      {/* WHY US */}
      <section className="section why-us">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.whyUs}</h2>
            <span className="accent-line" />
          </div>
          <div className="features-grid">
            {['exp', 'diag', 'warranty', 'db', 'equip', 'corp'].map((key, i) => (
              <div key={key} className="feature-card card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3>{t.features[key]}</h3>
                <p>{t.features[key + 'Desc']}</p>
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
            <h2>{t.cta.title}</h2>
            <p>{t.cta.desc}</p>
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
