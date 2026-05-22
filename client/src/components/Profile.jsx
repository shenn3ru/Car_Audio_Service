import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Profile.css';

function downloadCSV(data, filename) {
  const headers = Object.keys(data).join(',');
  const values = Object.values(data).map(v => `"${v}"`).join(',');
  const csv = `${headers}\n${values}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPDF(data) {
  // Simple HTML-based print to PDF
  const content = `
    <html><head><title>Profile Data</title>
    <style>body{font-family:sans-serif;padding:40px;} h1{color:#e8a020;} table{width:100%;border-collapse:collapse;} td,th{padding:10px;border:1px solid #ddd;text-align:left;} th{background:#f5f5f5;}</style>
    </head><body>
    <h1>Car Audio Service — Date Profil</h1>
    <table>
      ${Object.entries(data).map(([k,v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}
    </table>
    <p style="color:#999;margin-top:20px">Generat la ${new Date().toLocaleDateString('ro-RO')}</p>
    </body></html>
  `;
  const win = window.open('', '_blank');
  win.document.write(content);
  win.document.close();
  win.print();
}

export default function Profile() {
  const { currentUser, userProfile, fetchUserProfile } = useAuth();
  const { t, lang, changeLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const p = t.profile;

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSave() {
    const errs = {};
    if (!form.name.trim()) errs.name = t.auth.errors.nameRequired;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: form.name,
        phone: form.phone
      });
      await fetchUserProfile(currentUser.uid);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  }

  function handleExportCSV() {
    const data = {
      Nume: userProfile?.name || '',
      Email: currentUser?.email || '',
      Telefon: userProfile?.phone || '',
      Rol: userProfile?.role || 'user',
      'Înregistrat la': userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('ro-RO') : '',
      Limbă: lang,
      Temă: theme
    };
    downloadCSV(data, 'profil-car-audio.csv');
  }

  function handleExportPDF() {
    const data = {
      Nume: userProfile?.name || '',
      Email: currentUser?.email || '',
      Telefon: userProfile?.phone || '',
      Rol: userProfile?.role || 'user',
      'Înregistrat la': userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('ro-RO') : '',
      Limbă: lang,
      Temă: theme
    };
    downloadPDF(data);
  }

  const langs = [
    { code: 'ro', label: 'Română' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'cs', label: 'Čeština' },
  ];

  const joinDate = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="container">
          <h1>{p.title}</h1>
          <span className="accent-line" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="profile-layout">
            {/* SIDEBAR */}
            <div className="profile-sidebar">
              <div className="profile-avatar-card card">
                <div className="profile-avatar-big">
                  {(userProfile?.name || currentUser?.displayName || 'U').charAt(0).toUpperCase()}
                </div>
                <h3>{userProfile?.name}</h3>
                <span className={`badge ${userProfile?.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                  {userProfile?.role || 'user'}
                </span>
                <p className="join-date">{p.member}: {joinDate}</p>
              </div>

              {/* THEME */}
              <div className="settings-card card">
                <h4>{p.theme}</h4>
                <div className="theme-toggle-row">
                  <button
                    className={`theme-opt ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => theme !== 'dark' && toggleTheme()}
                  >{p.darkTheme}</button>
                  <button
                    className={`theme-opt ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => theme !== 'light' && toggleTheme()}
                  >{p.lightTheme}</button>
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="settings-card card">
                <h4>{p.language}</h4>
                <div className="lang-opts">
                  {langs.map(l => (
                    <button
                      key={l.code}
                      className={`lang-opt ${lang === l.code ? 'active' : ''}`}
                      onClick={() => changeLang(l.code)}
                    >{l.label}</button>
                  ))}
                </div>
              </div>

              {/* EXPORT */}
              <div className="settings-card card">
                <h4>{p.exportData}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button className="btn btn-outline" onClick={handleExportCSV}>{p.exportCSV}</button>
                  <button className="btn btn-outline" onClick={handleExportPDF}>{p.exportPDF}</button>
                </div>
              </div>
            </div>

            {/* MAIN */}
            <div className="profile-main">
              <div className="profile-info-card card">
                <div className="card-header-row">
                  <h3>Informații cont</h3>
                  {!editing && (
                    <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>{p.edit}</button>
                  )}
                </div>

                {saved && <div className="success-banner">{t.common.success}!</div>}

                {editing ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>{p.name}</label>
                      <input
                        className={`form-control ${errors.name ? 'error' : ''}`}
                        value={form.name}
                        onChange={e => { setForm(prev => ({ ...prev, name: e.target.value })); setErrors({}); }}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>{p.phone}</label>
                      <input
                        className="form-control"
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+373 XX XXX XXX"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? '...' : p.save}
                      </button>
                      <button className="btn btn-ghost" onClick={() => setEditing(false)}>{p.cancel}</button>
                    </div>
                  </div>
                ) : (
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">{p.name}</span>
                      <span className="info-value">{userProfile?.name || '—'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{p.email}</span>
                      <span className="info-value">{currentUser?.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{p.phone}</span>
                      <span className="info-value">{userProfile?.phone || '—'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{p.role}</span>
                      <span className="info-value">
                        <span className={`badge ${userProfile?.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                          {userProfile?.role || 'user'}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SECURITY NOTE */}
              <div className="security-note card">
                <h4>Securitate</h4>
                <p>Parola ta este stocată în siguranță prin Firebase Authentication (bcrypt hash). Datele tale sunt protejate și niciodată vândute terților.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}