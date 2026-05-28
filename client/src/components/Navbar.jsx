import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const { lang, changeLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/gallery', label: t.nav.gallery },
    { path: '/location', label: t.nav.location },
    { path: '/about', label: t.nav.about },
  ];

  const langs = [
    { code: 'ro', label: 'RO', full: 'Română' },
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'ru', label: 'RU', full: 'Русский' },
    { code: 'cs', label: 'CS', full: 'Čeština' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Car <span className="logo-accent">Audio</span> Service</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`nav-link ${location.pathname === l.path ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {/* Theme toggle */}
          <button className="icon-btn theme-btn" onClick={toggleTheme} title={theme === 'dark' ? t.common.lightMode : t.common.darkMode}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* Language switcher */}
          <div className="lang-switcher" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              {lang.toUpperCase()} <span className="chevron">▾</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {langs.map(l => (
                  <button
                    key={l.code}
                    className={`lang-option ${lang === l.code ? 'active' : ''}`}
                    onClick={() => { changeLang(l.code); setLangOpen(false); }}
                  >
                    <span className="lang-code">{l.label}</span>
                    <span className="lang-full">{l.full}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {currentUser ? (
            <div className="user-menu">
              <Link to="/profile" className="user-avatar" title={t.nav.profile}>
                {(userProfile?.name || currentUser.displayName || 'U').charAt(0).toUpperCase()}
              </Link>
              {userProfile?.role === 'admin' && (
                <Link to="/admin" className="btn btn-outline btn-sm">{t.nav.admin}</Link>
              )}
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>{t.nav.logout}</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-ghost btn-sm">{t.nav.login}</Link>
              <Link to="/register" className="btn btn-primary btn-sm">{t.nav.register}</Link>
            </div>
          )}

          {/* Hamburger */}
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}