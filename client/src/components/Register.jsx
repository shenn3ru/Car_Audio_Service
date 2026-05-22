import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import '../styles/Auth.css';

function validate(form, t) {
  const e = t.auth.errors;
  const errors = {};
  if (!form.name.trim()) errors.name = e.nameRequired;
  if (!form.email) errors.email = e.emailRequired;
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = e.emailInvalid;
  if (!form.password) errors.password = e.passRequired;
  else if (form.password.length < 6) errors.password = e.passMin;
  if (form.password !== form.confirm) errors.confirm = e.passMatch;
  return errors;
}

export default function Register() {
  const { t } = useLang();
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form, t);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setServerError('');
    try {
      await register(form.email, form.password, form.name, form.phone);
      navigate('/');
    } catch (err) {
      const code = err.code;
      if (code === 'auth/email-already-in-use') {
        setServerError('Acest email este deja înregistrat.');
      } else if (code === 'auth/operation-not-allowed') {
        setServerError('Email/Password auth nu este activat în Firebase Console.');
      } else if (code === 'auth/weak-password') {
        setServerError('Parola trebuie să aibă cel puțin 6 caractere.');
      } else if (code === 'auth/invalid-email') {
        setServerError('Adresa de email este invalidă.');
      } else if (code === 'auth/network-request-failed') {
        setServerError('Eroare de rețea. Verifică conexiunea la internet.');
      } else {
        setServerError(`Eroare: ${code || err.message}`);
      }
    } finally { setLoading(false); }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  return (
    <div className="auth-page">
      <div className="auth-box auth-box-wide">
        <div className="auth-logo">CAS</div>
        <h2>{t.auth.registerTitle}</h2>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label>{t.auth.name}</label>
              <input
                className={`form-control ${errors.name ? 'error' : ''}`}
                name="name" value={form.name} onChange={handleChange}
                placeholder="Ion Popescu"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>{t.auth.phone}</label>
              <input
                className="form-control"
                name="phone" value={form.phone} onChange={handleChange}
                placeholder="+373 XX XXX XXX"
              />
            </div>
          </div>
          <div className="form-group">
            <label>{t.auth.email}</label>
            <input
              className={`form-control ${errors.email ? 'error' : ''}`}
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="email@exemplu.com"
              autoComplete="email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t.auth.password}</label>
              <input
                className={`form-control ${errors.password ? 'error' : ''}`}
                type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="Min. 6 caractere"
                autoComplete="new-password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>{t.auth.confirmPassword}</label>
              <input
                className={`form-control ${errors.confirm ? 'error' : ''}`}
                type="password" name="confirm" value={form.confirm} onChange={handleChange}
                placeholder="Repetă parola"
                autoComplete="new-password"
              />
              {errors.confirm && <span className="error-text">{errors.confirm}</span>}
            </div>
          </div>
          <p className="password-note">
            Parola este stocată în siguranță (hash Firebase Auth)
          </p>
          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? '...' : t.auth.registerBtn}
          </button>
        </form>

        <div className="auth-divider"><span>sau</span></div>

        <button
          className="btn-google"
          type="button"
          onClick={async () => { try { await loginWithGoogle(); navigate('/'); } catch (e) { setServerError(`Eroare Google: ${e.code || e.message}`); } }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continuă cu Google
        </button>

        <p className="auth-switch">
          {t.auth.haveAccount}{' '}
          <Link to="/login">{t.auth.loginLink}</Link>
        </p>
      </div>
    </div>
  );
}