import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  createCandidate,
  deleteCandidate,
  listCandidates,
  updateCandidate,
} from '../api/candidates';

const ADMIN_EMAIL = 'admin@jalaacademy.com';
const ADMIN_PASSWORD = 'Admin@123';
const AUTH_KEY = 'jala_candidate_admin_auth';

const STATUSES = ['Active', 'Placed', 'Inactive', 'On Hold', 'Suspended', 'Expired', 'Blocked', 'Unknown'];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  joining_date: '',
  inactive_on: '',
  status: 'Active',
  message: '',
};

const toDateInput = (value) => {
  if (!value) return '';
  return String(value).slice(0, 10);
};

const normalizeCandidate = (candidate) => ({
  name: candidate.name.trim(),
  phone: candidate.phone.trim(),
  email: candidate.email.trim().toLowerCase(),
  joining_date: candidate.joining_date,
  inactive_on: candidate.inactive_on ? candidate.inactive_on : null,
  status: candidate.status,
  message: candidate.message.trim() ? candidate.message.trim() : null,
});

const validateCandidate = (candidate) => {
  const errors = [];
  const name = candidate.name.trim();
  const phone = candidate.phone.trim();
  const email = candidate.email.trim();

  if (name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters.');
  }

  if (!/^\d{10,12}$/.test(phone)) {
    errors.push('Phone number must be 10-12 digits.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) {
    errors.push('Enter a valid email address.');
  }

  if (!candidate.joining_date) {
    errors.push('Joining date is required.');
  }

  if (candidate.inactive_on && candidate.joining_date) {
    const inactiveDate = new Date(candidate.inactive_on);
    const joiningDate = new Date(candidate.joining_date);

    if (inactiveDate < joiningDate) {
      errors.push('Inactive date cannot be earlier than joining date.');
    }
  }

  if (!STATUSES.includes(candidate.status)) {
    errors.push('Choose a valid status.');
  }

  if (candidate.message.length > 500) {
    errors.push('Message cannot exceed 500 characters.');
  }

  return errors;
};

export function CandidateAdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setMessage('Done. Candidate admin login successful.');
      navigate('/candidate-admin');
      return;
    }

    setMessage('Use admin@jalaacademy.com / Admin@123');
  };

  return (
    <>
      <SEO
        title="Candidate Admin Login"
        description="JALA Connect candidate admin sign in page."
      />

      <main className="jala-signin-page">
        <section className="jala-signin-card" aria-label="Candidate admin sign in form">
          <div className="jala-signin-heading">
            <h1>Sign in</h1>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="jala-signin-form">
            <label className="jala-signin-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@jalaacademy.com"
                required
              />
            </label>

            <label className="jala-signin-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </label>

            <button type="submit" className="jala-signin-submit">
              Sign in
            </button>
          </form>

          {message && <p className="jala-signin-message">{message}</p>}

          <p className="jala-signin-default">
            Default: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </p>
        </section>
      </main>
    </>
  );
}

export function CandidateAdminGuard({ children }) {
  if (localStorage.getItem(AUTH_KEY) !== 'true') {
    return <Navigate to="/candidate-login" replace />;
  }

  return children;
}

export default function CandidateAdmin() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (text, type = 'success') => {
    setAlert({ text, type });
    window.setTimeout(() => setAlert(null), 3500);
  };

  const loadCandidates = async () => {
    setLoading(true);

    try {
      const data = await listCandidates();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert(error.message || 'Could not load candidates.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const stats = useMemo(() => {
    const active = candidates.filter((candidate) => candidate.status === 'Active').length;
    const placed = candidates.filter((candidate) => candidate.status === 'Placed').length;
    const inactive = candidates.filter((candidate) => candidate.status === 'Inactive').length;

    return { total: candidates.length, active, placed, inactive };
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return candidates;
    }

    return candidates.filter((candidate) => (
      [candidate.name, candidate.phone, candidate.email, candidate.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    ));
  }, [candidates, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(false);
  };

  const startAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
  };

  const startEdit = (candidate) => {
    setForm({
      name: candidate.name || '',
      phone: candidate.phone || '',
      email: candidate.email || '',
      joining_date: toDateInput(candidate.joining_date),
      inactive_on: toDateInput(candidate.inactive_on),
      status: candidate.status || 'Active',
      message: candidate.message || '',
    });
    setEditingId(candidate.id);
    setFormOpen(true);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 12) : value;

    setForm((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const errors = validateCandidate(form);

    if (errors.length > 0) {
      showAlert(errors.join(' '), 'error');
      return;
    }

    setSaving(true);

    try {
      const payload = normalizeCandidate(form);
      const savedCandidate = editingId
        ? await updateCandidate(editingId, payload)
        : await createCandidate(payload);

      setCandidates((current) => (
        editingId
          ? current.map((candidate) => (candidate.id === editingId ? savedCandidate : candidate))
          : [savedCandidate, ...current]
      ));
      resetForm();
      showAlert(editingId ? 'Candidate updated successfully.' : 'Candidate added successfully.');
    } catch (error) {
      showAlert(error.message || 'Could not save candidate.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (candidate) => {
    const confirmed = window.confirm(`Delete ${candidate.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteCandidate(candidate.id);
      setCandidates((current) => current.filter((item) => item.id !== candidate.id));
      showAlert('Candidate deleted successfully.');
    } catch (error) {
      showAlert(error.message || 'Could not delete candidate.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/candidate-login');
  };

  return (
    <>
      <SEO
        title="Candidate Admin"
        description="Manage JALA Connect candidate records."
      />

      <main className="candidate-admin-shell">
        <aside className="candidate-admin-sidebar">
          <div className="candidate-admin-brand">
            <span>JC</span>
            <strong>JALA Connect</strong>
          </div>
          <nav className="candidate-admin-nav" aria-label="Candidate admin navigation">
            <button type="button" className="active">Candidates</button>
            <button type="button" onClick={startAdd}>Add Candidate</button>
            <button type="button" onClick={loadCandidates}>Refresh</button>
          </nav>
          <div className="candidate-admin-user">
            <strong>JALA Admin</strong>
            <span>Candidate Registry</span>
          </div>
        </aside>

        <section className="candidate-admin-main">
          <header className="candidate-admin-topbar">
            <div>
              <span>Candidate Admin</span>
              <h1>Candidate Registry</h1>
            </div>
            <button type="button" className="candidate-logout" onClick={handleLogout}>
              Logout
            </button>
          </header>

          {alert && (
            <div className={`candidate-alert ${alert.type}`} role="alert">
              {alert.text}
            </div>
          )}

          <section className="candidate-stats" aria-label="Candidate summary">
            <div>
              <span>Total Candidates</span>
              <strong>{stats.total}</strong>
            </div>
            <div>
              <span>Active</span>
              <strong className="green">{stats.active}</strong>
            </div>
            <div>
              <span>Placed</span>
              <strong className="blue">{stats.placed}</strong>
            </div>
            <div>
              <span>Inactive</span>
              <strong className="amber">{stats.inactive}</strong>
            </div>
          </section>

          <section className="candidate-panel">
            <div className="candidate-panel-head">
              <div>
                <h2>Candidates</h2>
                <p>Add, edit, delete, and search phone-number records.</p>
              </div>
              <button type="button" className="candidate-primary" onClick={startAdd}>
                + Add Candidate
              </button>
            </div>

            <input
              type="search"
              className="candidate-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, phone, email, or status"
            />

            <div className="candidate-table-wrap">
              <table className="candidate-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Joining Date</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th className="right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="candidate-empty">Loading candidates...</td>
                    </tr>
                  ) : filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="candidate-empty">No candidates found.</td>
                    </tr>
                  ) : filteredCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>
                        <strong>{candidate.name}</strong>
                      </td>
                      <td>{candidate.phone}</td>
                      <td>{candidate.email}</td>
                      <td>{toDateInput(candidate.joining_date)}</td>
                      <td>
                        <span className={`candidate-status ${String(candidate.status).toLowerCase().replace(/\s+/g, '-')}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="candidate-message">{candidate.message || '-'}</td>
                      <td>
                        <div className="candidate-actions">
                          <button type="button" onClick={() => startEdit(candidate)}>Edit</button>
                          <button type="button" className="danger" onClick={() => handleDelete(candidate)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {formOpen && (
            <div className="candidate-modal-backdrop">
              <section className="candidate-modal" aria-label={editingId ? 'Edit candidate form' : 'Add candidate form'}>
                <div className="candidate-modal-head">
                  <h2>{editingId ? 'Edit Candidate' : 'Add Candidate'}</h2>
                  <button type="button" onClick={resetForm} aria-label="Close">x</button>
                </div>

                <form className="candidate-form" onSubmit={handleSave}>
                  <label>
                    <span>Full Name</span>
                    <input name="name" value={form.name} onChange={handleFieldChange} placeholder="Candidate name" required />
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <input name="phone" value={form.phone} onChange={handleFieldChange} inputMode="numeric" maxLength="12" placeholder="10-12 digit phone" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" value={form.email} onChange={handleFieldChange} placeholder="candidate@example.com" required />
                  </label>
                  <label>
                    <span>Joining Date</span>
                    <input name="joining_date" type="date" value={form.joining_date} onChange={handleFieldChange} required />
                  </label>
                  <label>
                    <span>Inactive On</span>
                    <input name="inactive_on" type="date" value={form.inactive_on} onChange={handleFieldChange} />
                  </label>
                  <label>
                    <span>Status</span>
                    <select name="status" value={form.status} onChange={handleFieldChange} required>
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <label className="candidate-form-wide">
                    <span>Message</span>
                    <textarea name="message" value={form.message} onChange={handleFieldChange} maxLength="500" rows="3" placeholder="Candidate notes shown on phone search" />
                  </label>

                  <div className="candidate-form-actions">
                    <button type="button" className="candidate-secondary" onClick={resetForm}>Cancel</button>
                    <button type="submit" className="candidate-primary" disabled={saving}>
                      {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Candidate'}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
