// src/components/Contact.tsx
import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('sending')
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      setForm({ name: '', phone: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  // ... rest of JSX is unchanged

  return (
    <div className="contact-section" id="contact">
      <div className="section-header">
        <h2>Contact</h2>
        <p>Suntem aici pentru tine — contactează-ne oricând</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <strong>Telefon</strong>
              <p><a href="tel:+37367571810">+373 67 571 810</a></p>
              <p><a href="tel:+37376051625">+373 76 051 625</a></p>
              <p><a href="tel:+37369826699">+373 69 826 699</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <div>
              <strong>Email</strong>
              <p><a href="mailto:soimu.service@gmail.com">soimu.service@gmail.com</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <strong>Adresă</strong>
              <p>Strada Tudor Vladimirescu 3<br />MD-2024, Chișinău</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Program</strong>
              <p>Luni – Vineri: 09:00 – 18:00</p>
              <p>Sâmbătă: 09:00 – 15:00</p>
              <p>Duminică: Închis</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Trimite o cerere</h3>
          <input
            name="name"
            placeholder="Nume *"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Telefon *"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Mesaj (opțional)"
            value={form.message}
            onChange={handleChange}
            rows={4}
          />
          <button type="submit" disabled={status === 'sending'} className="submit-btn">
            {status === 'sending' ? 'Se trimite...' : 'Trimite cererea'}
          </button>
          {status === 'success' && (
            <p className="form-success">✅ Mesajul a fost trimis! Vă vom contacta în curând.</p>
          )}
          {status === 'error' && (
            <p className="form-error">❌ Eroare la trimitere. Vă rugăm sunați direct.</p>
          )}
        </form>
      </div>

      <div className="map-container">
        <iframe
          title="Locație Car Audio Service"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.5!2d28.8325!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAxJzI4LjIiTiAyOMKwNDknNTcuMCJF!5e0!3m2!1sro!2smd!4v1234567890"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}
