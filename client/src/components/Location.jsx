import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import { db, storage } from '../firebase/firebase';
import { useLang } from '../context/LangContext';
import '../styles/Location.css';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function validate(form, t) {
  const errors = {};
  if (!form.name.trim())    errors.name    = t.auth.errors.nameRequired;
  if (!form.phone.trim())   errors.phone   = t.location.phoneRequired;
  if (!form.message.trim()) errors.message = t.location.messageRequired;
  return errors;
}

export default function Location() {
  const { t } = useLang();
  const l = t.location;
  const fileInputRef = useRef(null);

  const [form, setForm]       = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle');
  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form, t);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');

    try {
      // 1. Upload imagine în Firebase Storage (dacă există)
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `messages/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 2. Salvare mesaj în Firestore
      await addDoc(collection(db, 'messages'), {
        ...form,
        imageUrl,
        createdAt: new Date().toISOString(),
        read: false,
      });

      // 3. Trimitere email notificare via EmailJS
      if (EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'your_service_id') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:  form.name,
            phone:      form.phone,
            message:    form.message,
            image_url:  imageUrl || 'Nicio imagine atașată',
            reply_to:   'noreply@car-audio-service.info',
          },
          EMAILJS_PUBLIC_KEY
        );
      }

      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
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
                <p><a href="mailto:remont.magnitol@gmail.com">remont.magnitol@gmail.com</a></p>
              </div>

              <div className="info-card card hours-card">
                <h4>{l.hours}</h4>
                <div className="hours-row">
                  <span>{l.monFri}</span><strong>09:00 - 19:00</strong>
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
                    {/* Nume */}
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

                    {/* Telefon */}
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

                    {/* Mesaj */}
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

                    {/* Upload poză */}
                    <div className="form-group">
                      <label>{l.photoLabel}</label>
                      {imagePreview ? (
                        <div className="image-preview-wrap">
                          <img src={imagePreview} alt="preview" className="image-preview" />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={removeImage}
                          >
                            ✕ {l.removePhoto}
                          </button>
                        </div>
                      ) : (
                        <label className="file-upload-label">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                          <span className="file-upload-btn">📷 {l.addPhoto}</span>
                          <span className="file-upload-hint">{l.photoHint}</span>
                        </label>
                      )}
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={status === 'sending'}
                      style={{ width: '100%' }}
                    >
                      {status === 'sending' ? l.sending : l.send}
                    </button>

                    {status === 'error' && (
                      <p className="error-text" style={{ marginTop: 8 }}>{t.common.error}</p>
                    )}
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
