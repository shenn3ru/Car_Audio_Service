import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import '../styles/Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">Car <span>Audio</span> Service</div>
          <p>Chișinău, Moldova. {t.about?.warranty || 'Garanție 3-12 luni.'}</p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link fb">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link ig">ig</a>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="social-link tg">✈</a>
            <a href="https://wa.me/37367571810" target="_blank" rel="noreferrer" className="social-link wa">w</a>
          </div>
        </div>

        <div className="footer-nav">
          <h4>{t.common.navigation}</h4>
          <Link to="/">{t.nav.home}</Link>
          <Link to="/services">{t.nav.services}</Link>
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/gallery">{t.nav.gallery}</Link>
          <Link to="/location">{t.nav.location}</Link>
        </div>

        <div className="footer-contact">
          <h4>{t.common.contact}</h4>
          <p>+373 67 571 810</p>
          <p>+373 76 051 625</p>
          <p>+373 69 826 699</p>
          <p>soimu.service@gmail.com</p>
          <p>Str. Tudor Vladimirescu 3, Chișinău</p>
        </div>

        <div className="footer-hours">
          <h4>{t.location?.hours || 'Program'}</h4>
          <p>{t.location?.monFri || 'Luni - Vineri'}: <strong>09:00 - 18:00</strong></p>
          <p>{t.location?.sat || 'Sâmbătă'}: <strong>09:00 - 15:00</strong></p>
          <p>{t.location?.sun || 'Duminică'}: <strong>{t.location?.closed || 'Închis'}</strong></p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Car Audio Service. {t.common.allRights}</p>
        </div>
      </div>
    </footer>
  );
}