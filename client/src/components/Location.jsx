import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useLang } from '../context/LangContext';
import '../styles/Location.css';

function validate(form, t) {
  const errors = {};
  if (!form.name.trim()) errors.name = t.auth.errors.nameRequired;
  if (!form.phone.trim()) errors.phone = 'Telefonul este obligatoriu';
  if (!form.message.trim()) errors.message = 'Mesajul este obligatoriu';
  return errors;
}

export default function Location() {
  const { t } = useLang();
  const l = t.location;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form, t);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: new Date().toISOString(),
        read: false
      });
      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  return (
    <div className="location-page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-content fade-up">
            <h1>{l.title}</h1>
            <p>{l.subtitle}</p>
            <span className="accent-line" />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="location-grid">
            {/* INFO */}
            <div className="location-info fade-up">
              <div className="info-card card">
                <h3>{l.address}</h3>
                <a
                  href="https://maps.google.com/?q=Tudor+Vladimirescu+3+Chisinau"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ marginTop: 12 }}
                >
                  {l.getDirections}
                </a>
              </div>

              <div className="info-card card">
                <h4>{l.phone}</h4>
                <p><a href="tel:+37367571810">+373 67 571 810</a></p>
                <p><a href="tel:+37376051625">+373 76 051 625</a></p>
                <p><a href="tel:+37369826699">+373 69 826 699</a></p>
              </div>

              <div className="info-card card">
                <h4>{l.email}</h4>
                <p><a href="mailto:soimu.service@gmail.com">soimu.service@gmail.com</a></p>
              </div>

              <div className="info-card card hours-card">
                <h4>{l.hours}</h4>
                <div className="hours-row">
                  <span>{l.monFri}</span><strong>09:00 - 18:00</strong>
                </div>
                <div className="hours-row">
                  <span>{l.sat}</span><strong>09:00 - 15:00</strong>
                </div>
                <div className="hours-row closed">
                  <span>{l.sun}</span><strong>{l.closed}</strong>
                </div>
              </div>
            </div>

            {/* MAP + FORM */}
            <div className="location-main fade-up fade-up-2">
              {/* GOOGLE MAP */}
              <div className="map-container">
                <iframe
                  title="Locație Car Audio Service"
                  src="https://maps.google.com/maps?q=Tudor+Vladimirescu+3+Chisinau+Moldova&output=embed&z=16"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* CONTACT FORM */}
              <div className="contact-form-card card">
                <h3>{l.contactForm}</h3>
                {status === 'sent' ? (
                  <div className="success-msg">✅ {l.sent}</div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <label>{l.name}</label>
                      <input
                        className={`form-control ${errors.name ? 'error' : ''}`}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={l.name}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>{l.phone2}</label>
                      <input
                        className={`form-control ${errors.phone ? 'error' : ''}`}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+373 XX XXX XXX"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label>{l.message}</label>
                      <textarea
                        className={`form-control ${errors.message ? 'error' : ''}`}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={l.message}
                        rows={4}
                      />
                      {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={status === 'sending'} style={{ width: '100%' }}>
                      {status === 'sending' ? l.sending : l.send}
                    </button>
                    {status === 'error' && <p className="error-text" style={{ marginTop: 8 }}>{t.common.error}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}