import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

interface Props {
  onClose: () => void
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const services = [
  'Multimedia auto',
  'Audio auto',
  'Electronică auto',
  'Premium OEM / CarPlay',
  'Accesorii',
  'TV & Monitoare',
  'Reparație difuzoare',
  'Reparație ecran',
  'Update software',
  'Altele',
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

export default function AppointmentModal({ onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    carBrand: '',
    notes: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await addDoc(collection(db, 'appointments'), {
        ...form,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {status === 'success' ? (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <h2>Programare confirmată!</h2>
            <p>
              Vă vom contacta la numărul <strong>{form.phone}</strong> pentru confirmare.
              <br />Ne vedem pe <strong>{form.date}</strong> la <strong>{form.time}</strong>.
            </p>
            <button className="hero-btn" onClick={onClose}>Închide</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Programează-te</h2>
              <p>Completați formularul și vă vom confirma programarea</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nume *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Ion Popescu" required />
                </div>
                <div className="form-group">
                  <label>Telefon *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+373 XX XXX XXX" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Serviciu dorit *</label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Alege serviciul...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Marca mașinii</label>
                  <input name="carBrand" value={form.carBrand} onChange={handleChange} placeholder="Ex: BMW, Audi..." />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data dorită *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} min={today} required />
                </div>
                <div className="form-group">
                  <label>Ora *</label>
                  <select name="time" value={form.time} onChange={handleChange} required>
                    <option value="">Alege ora...</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Note suplimentare</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Descrieți problema sau cerința..." />
              </div>

              <button type="submit" className="hero-btn full-width" disabled={status === 'sending'}>
                {status === 'sending' ? 'Se trimite...' : 'Confirmă programarea'}
              </button>

              {status === 'error' && (
                <p className="form-error">Eroare. Sunați direct la +373 67 571 810</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
