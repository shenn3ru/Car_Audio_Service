import React, { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useLang } from '../context/LangContext';
import '../styles/Admin.css';

const TABS = ['services', 'users', 'messages'];

const emptyService = { name: '', category: 'multimedia', description: '', priceFrom: '', warranty: '' };

export default function Admin() {
  const { t } = useLang();
  const a = t.admin;

  const [tab, setTab] = useState('services');
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { loadData(); }, [tab]);

  async function loadData() {
    setLoading(true);
    try {
      if (tab === 'services') {
        const snap = await getDocs(collection(db, 'services'));
        setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else if (tab === 'users') {
        const snap = await getDocs(collection(db, 'users'));
        setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else if (tab === 'messages') {
        const snap = await getDocs(collection(db, 'messages'));
        setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() {
    setEditItem(null);
    setFormData(tab === 'services' ? { ...emptyService } : { name: '', email: '', role: 'user', phone: '' });
    setModalType(tab);
    setShowModal(true);
  }

  function openEdit(item) {
    setEditItem(item);
    setFormData({ ...item });
    setModalType(tab);
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editItem) {
        await updateDoc(doc(db, tab, editItem.id), formData);
        showToast('Actualizat cu succes!');
      } else {
        await addDoc(collection(db, tab), { ...formData, createdAt: new Date().toISOString() });
        showToast('Adăugat cu succes!');
      }
      setShowModal(false);
      loadData();
    } catch (e) {
      console.error(e);
      showToast('Eroare!', 'error');
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, tab, id));
      showToast('Șters cu succes!');
      setConfirmDelete(null);
      loadData();
    } catch (e) {
      showToast('Eroare la ștergere!', 'error');
    }
  }

  async function markMessageRead(id) {
    await updateDoc(doc(db, 'messages', id), { read: true });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="container">
          <h1>{a.title}</h1>
          <span className="accent-line" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* TABS */}
          <div className="admin-tabs">
            {TABS.map(tb => (
              <button
                key={tb}
                className={`admin-tab ${tab === tb ? 'active' : ''}`}
                onClick={() => setTab(tb)}
              >
                {a[tb]}
                {tb === 'messages' && messages.filter(m => !m.read).length > 0 && (
                  <span className="tab-badge">{messages.filter(m => !m.read).length}</span>
                )}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="admin-content">
            {/* TOOLBAR */}
            {tab !== 'messages' && (
              <div className="admin-toolbar">
                <h3>{tab === 'services' ? a.services : a.users}</h3>
                <button className="btn btn-primary btn-sm" onClick={openAdd}>
                  + {tab === 'services' ? a.addService : a.addUser}
                </button>
              </div>
            )}

            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                {/* SERVICES TABLE */}
                {tab === 'services' && (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>{a.name}</th>
                          <th>{a.category}</th>
                          <th>{a.price}</th>
                          <th>{a.description}</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.length === 0 && (
                          <tr><td colSpan={5} className="empty-row">Niciun serviciu. Adaugă primul!</td></tr>
                        )}
                        {services.map(s => (
                          <tr key={s.id}>
                            <td><strong>{s.name}</strong></td>
                            <td><span className="cat-badge">{s.category}</span></td>
                            <td>{s.priceFrom ? `${s.priceFrom} MDL` : '—'}</td>
                            <td className="desc-cell">{s.description || '—'}</td>
                            <td>
                              <div className="action-btns">
                                <button className="btn btn-ghost btn-xs" onClick={() => openEdit(s)}>Edit</button>
                                <button className="btn btn-danger btn-xs" onClick={() => setConfirmDelete(s)}>Del</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* USERS TABLE */}
                {tab === 'users' && (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>{a.name}</th>
                          <th>{a.email}</th>
                          <th>Telefon</th>
                          <th>{a.role}</th>
                          <th>Înregistrat</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length === 0 && (
                          <tr><td colSpan={6} className="empty-row">Niciun utilizator.</td></tr>
                        )}
                        {users.map(u => (
                          <tr key={u.id}>
                            <td><strong>{u.name}</strong></td>
                            <td>{u.email}</td>
                            <td>{u.phone || '—'}</td>
                            <td>
                              <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('ro-RO') : '—'}</td>
                            <td>
                              <div className="action-btns">
                                <button className="btn btn-ghost btn-xs" onClick={() => openEdit(u)}>✏️</button>
                                <button className="btn btn-danger btn-xs" onClick={() => setConfirmDelete(u)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* MESSAGES */}
                {tab === 'messages' && (
                  <div className="messages-list">
                    <h3>{a.messages} ({messages.length})</h3>
                    {messages.length === 0 && <p className="empty-row">Niciun mesaj.</p>}
                    {messages.map(m => (
                      <div key={m.id} className={`message-card card ${!m.read ? 'unread' : ''}`}>
                        <div className="msg-header">
                          <div>
                            <strong>{m.name}</strong>
                            <span className="msg-phone">📞 {m.phone}</span>
                          </div>
                          <div className="msg-meta">
                            <span className="msg-date">
                              {m.createdAt ? new Date(m.createdAt).toLocaleDateString('ro-RO') : ''}
                            </span>
                            {!m.read && (
                              <button className="btn btn-ghost btn-xs" onClick={() => markMessageRead(m.id)}>
                                ✓ Marcat citit
                              </button>
                            )}
                            {!m.read && <span className="unread-dot" />}
                          </div>
                        </div>
                        <p className="msg-body">{m.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editItem ? a.editService : (tab === 'services' ? a.addService : a.addUser)}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            {tab === 'services' && (
              <>
                <div className="form-group">
                  <label>{a.name}</label>
                  <input className="form-control" value={formData.name || ''} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Multimedia Auto" />
                </div>
                <div className="form-group">
                  <label>{a.category}</label>
                  <select className="form-control" value={formData.category || 'multimedia'} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}>
                    <option value="multimedia">Multimedia</option>
                    <option value="audio">Audio</option>
                    <option value="electronic">Electronică</option>
                    <option value="carplay">CarPlay</option>
                    <option value="oem">OEM Premium</option>
                    <option value="accessories">Accesorii</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{a.price} (MDL)</label>
                  <input className="form-control" type="number" value={formData.priceFrom || ''} onChange={e => setFormData(p => ({ ...p, priceFrom: e.target.value }))} placeholder="300" />
                </div>
                <div className="form-group">
                  <label>Garanție</label>
                  <input className="form-control" value={formData.warranty || ''} onChange={e => setFormData(p => ({ ...p, warranty: e.target.value }))} placeholder="12 luni" />
                </div>
                <div className="form-group">
                  <label>{a.description}</label>
                  <textarea className="form-control" rows={3} value={formData.description || ''} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
                </div>
              </>
            )}

            {tab === 'users' && (
              <>
                <div className="form-group">
                  <label>{a.name}</label>
                  <input className="form-control" value={formData.name || ''} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input className="form-control" value={formData.phone || ''} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>{a.role}</label>
                  <select className="form-control" value={formData.role || 'user'} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? '...' : a.save}
              </button>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>{a.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>{a.confirmDelete}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              <strong>{confirmDelete.name || confirmDelete.email}</strong>
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete.id)}>
                {a.deleteService}
              </button>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>{a.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}