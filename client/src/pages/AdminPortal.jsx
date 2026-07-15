import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const STORAGE_KEY = 'jala_connect_data';
const AUTH_KEY = 'jala_admin_auth';

const initialData = {
  departments: [
    { id: 'dep-1', name: 'engineering', description: 'Product and platform delivery', isActive: true },
  ],
  designations: [
    { id: 'des-1', title: 'Software Engineer', department: 'engineering', level: 'junior', isActive: true },
    { id: 'des-2', title: 'QA Engineer', department: 'engineering', level: 'mid', isActive: true },
  ],
  skills: [
    { id: 'skill-1', name: 'React.js', category: 'technical', isActive: true },
    { id: 'skill-2', name: 'Node.js', category: 'technical', isActive: true },
  ],
  countries: [
    { id: 'country-1', name: 'India', code: 'IN', isActive: true },
  ],
  states: [
    { id: 'state-1', name: 'Telangana', code: 'TG', country: 'India', isActive: true },
  ],
  cities: [
    { id: 'city-1', name: 'Hyderabad', state: 'Telangana', country: 'India', isActive: true },
  ],
  employees: [
    {
      id: 'emp-1',
      employeeId: 'MAG-001',
      firstName: 'Aarav',
      lastName: 'Reddy',
      email: 'aarav.reddy@jalaacademy.com',
      phone: '9876543210',
      department: 'engineering',
      designation: 'Software Engineer',
      joiningDate: '2026-01-12',
      employmentType: 'full-time',
      status: 'active',
      city: 'Hyderabad',
      skills: 'React.js, Node.js',
    },
    {
      id: 'emp-2',
      employeeId: 'MAG-002',
      firstName: 'Meera',
      lastName: 'Sharma',
      email: 'meera.sharma@jalaacademy.com',
      phone: '9123456780',
      department: 'engineering',
      designation: 'QA Engineer',
      joiningDate: '2026-02-20',
      employmentType: 'full-time',
      status: 'active',
      city: 'Hyderabad',
      skills: 'Automation, API Testing',
    },
  ],
};

const pages = [
  { path: '/dashboard', label: 'Dashboard', icon: 'D' },
  { path: '/employees', label: 'Employees', icon: 'E' },
  { group: 'MASTER DATA' },
  { path: '/departments', label: 'Departments', icon: 'DP' },
  { path: '/designations', label: 'Designations', icon: 'DS' },
  { path: '/skills', label: 'Skills', icon: 'SK' },
  { path: '/countries', label: 'Countries', icon: 'CO' },
  { path: '/states', label: 'States', icon: 'ST' },
  { path: '/cities', label: 'Cities', icon: 'CI' },
];

const configs = {
  employees: {
    title: 'Employees',
    subtitle: 'Manage employee records',
    createLabel: 'Employee',
    columns: [
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'firstName', label: 'Name', render: (item) => `${item.firstName} ${item.lastName}` },
      { key: 'email', label: 'Email' },
      { key: 'department', label: 'Department' },
      { key: 'designation', label: 'Designation' },
      { key: 'status', label: 'Status', status: true },
    ],
    fields: [
      { key: 'employeeId', label: 'Employee ID', required: true },
      { key: 'firstName', label: 'First Name', required: true },
      { key: 'lastName', label: 'Last Name', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'phone', label: 'Phone', required: true },
      { key: 'department', label: 'Department', source: 'departments', sourceLabel: 'name', required: true },
      { key: 'designation', label: 'Designation', source: 'designations', sourceLabel: 'title', required: true },
      { key: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
      { key: 'employmentType', label: 'Employment Type', options: ['full-time', 'part-time', 'contract', 'intern'] },
      { key: 'status', label: 'Status', options: ['active', 'inactive'] },
      { key: 'city', label: 'City', source: 'cities', sourceLabel: 'name' },
      { key: 'skills', label: 'Skills' },
    ],
  },
  departments: {
    title: 'Departments',
    subtitle: 'Manage organizational departments',
    createLabel: 'Department',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'name', label: 'Department Name', required: true },
      { key: 'description', label: 'Description' },
    ],
  },
  designations: {
    title: 'Designations',
    subtitle: 'Manage job designations',
    createLabel: 'Designation',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'department', label: 'Department' },
      { key: 'level', label: 'Level' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'department', label: 'Department', source: 'departments', sourceLabel: 'name', required: true },
      { key: 'level', label: 'Level', options: ['junior', 'mid', 'senior', 'lead', 'manager', 'director'] },
    ],
  },
  skills: {
    title: 'Skills',
    subtitle: 'Manage skill catalog',
    createLabel: 'Skill',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'name', label: 'Skill Name', required: true },
      { key: 'category', label: 'Category', options: ['technical', 'soft', 'domain', 'tool'] },
    ],
  },
  countries: {
    title: 'Countries',
    subtitle: 'Manage country master data',
    createLabel: 'Country',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'code', label: 'Code' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'name', label: 'Country Name', required: true },
      { key: 'code', label: 'ISO Code', required: true },
    ],
  },
  states: {
    title: 'States',
    subtitle: 'Manage state master data',
    createLabel: 'State',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'code', label: 'Code' },
      { key: 'country', label: 'Country' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'name', label: 'State Name', required: true },
      { key: 'code', label: 'Code' },
      { key: 'country', label: 'Country', source: 'countries', sourceLabel: 'name', required: true },
    ],
  },
  cities: {
    title: 'Cities',
    subtitle: 'Manage city master data',
    createLabel: 'City',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'state', label: 'State' },
      { key: 'country', label: 'Country' },
      { key: 'isActive', label: 'Status', active: true },
    ],
    fields: [
      { key: 'name', label: 'City Name', required: true },
      { key: 'country', label: 'Country', source: 'countries', sourceLabel: 'name', required: true },
      { key: 'state', label: 'State', source: 'states', sourceLabel: 'name', required: true },
    ],
  },
};

function readData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
  } catch {
    return initialData;
  }
}

function useHrData() {
  const [data, setData] = useState(readData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const saveItem = (type, item) => {
    setData((current) => {
      const list = current[type] || [];
      const isEdit = Boolean(item.id);
      const id = item.id || `${type}-${Date.now()}`;
      const cleanItem = { ...item, id };
      if (type !== 'employees' && typeof cleanItem.isActive !== 'boolean') cleanItem.isActive = true;
      if (type === 'employees' && !cleanItem.status) cleanItem.status = 'active';
      return {
        ...current,
        [type]: isEdit ? list.map((row) => (row.id === id ? cleanItem : row)) : [cleanItem, ...list],
      };
    });
  };

  const deleteItem = (type, id) => {
    setData((current) => ({ ...current, [type]: current[type].filter((row) => row.id !== id) }));
  };

  const toggleItem = (type, item) => {
    if (type === 'employees') {
      saveItem(type, { ...item, status: item.status === 'active' ? 'inactive' : 'active' });
      return;
    }
    saveItem(type, { ...item, isActive: !item.isActive });
  };

  return { data, saveItem, deleteItem, toggleItem };
}

function titleCase(value) {
  return String(value || '').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function isAuthed() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function AdminGuard({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function AdminPortal({ section = 'dashboard' }) {
  const { data, saveItem, deleteItem, toggleItem } = useHrData();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/login');
  };

  return (
    <>
      <SEO title="JALA Connect" description="JALA Connect admin dashboard" />
      <div className="hrms-shell">
        <aside className="hrms-sidebar">
          <Link to="/dashboard" className="hrms-brand">
            <span className="hrms-brand-mark">M</span>
            <span>JALA Connect</span>
          </Link>

          <nav className="hrms-nav">
            {pages.map((page) => page.group ? (
              <div key={page.group} className="hrms-nav-group">{page.group}</div>
            ) : (
              <Link
                key={page.path}
                to={page.path}
                className={`hrms-nav-link ${location.pathname === page.path ? 'active' : ''}`}
              >
                <span>{page.icon}</span>
                <span>{page.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hrms-user">
            <span className="hrms-user-avatar">MA</span>
            <span>
              <strong>JALA Admin</strong>
              <small>Admin</small>
            </span>
          </div>
        </aside>

        <div className="hrms-main">
          <header className="hrms-topbar">
            <span>{configs[section]?.title || 'Dashboard'}</span>
            <button type="button" onClick={logout} className="hrms-logout">Logout</button>
          </header>

          <main className="hrms-content">
            {section === 'dashboard' ? (
              <Dashboard data={data} />
            ) : section === 'profile' ? (
              <Profile />
            ) : (
              <CrudPage
                type={section}
                config={configs[section]}
                data={data}
                saveItem={saveItem}
                deleteItem={deleteItem}
                toggleItem={toggleItem}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function Dashboard({ data }) {
  const total = data.employees.length;
  const active = data.employees.filter((employee) => employee.status === 'active').length;
  const inactive = total - active;
  const departmentCounts = data.departments.map((department) => ({
    name: department.name,
    count: data.employees.filter((employee) => employee.department === department.name).length,
  })).sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...departmentCounts.map((item) => item.count), 1);

  return (
    <section>
      <PageHeading title="Dashboard" subtitle="Organization overview" />
      <div className="hrms-stats">
        <StatCard label="Total Employees" value={total} />
        <StatCard label="Active" value={active} tone="green" />
        <StatCard label="Inactive" value={inactive} tone="amber" />
        <StatCard label="Departments" value={data.departments.length} tone="blue" />
      </div>

      <div className="hrms-card hrms-department-card">
        <h2>Top Departments by Headcount</h2>
        {departmentCounts.map((department) => (
          <div className="hrms-bar-row" key={department.name}>
            <span>{department.name}</span>
            <div><i style={{ width: `${(department.count / maxCount) * 100}%` }} /></div>
            <strong>{department.count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatCard({ label, value, tone = 'dark' }) {
  return (
    <div className="hrms-card hrms-stat-card">
      <p>{label}</p>
      <strong className={`tone-${tone}`}>{value}</strong>
    </div>
  );
}

function CrudPage({ type, config, data, saveItem, deleteItem, toggleItem }) {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = data[type] || [];
    if (!term) return list;
    return list.filter((item) => JSON.stringify(item).toLowerCase().includes(term));
  }, [data, search, type]);

  return (
    <section>
      <PageHeading
        title={config.title}
        subtitle={config.subtitle}
        action={<button className="hrms-primary" onClick={() => setEditing({})}>+ Add {config.createLabel}</button>}
      />

      <input
        className="hrms-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search..."
      />

      <div className="hrms-card hrms-table-card">
        <table className="hrms-table">
          <thead>
            <tr>
              {config.columns.map((column) => <th key={column.key}>{column.label}</th>)}
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                {config.columns.map((column) => (
                  <td key={column.key}>
                    {column.status ? <StatusBadge value={item.status} /> : column.active ? <StatusBadge value={item.isActive ? 'active' : 'inactive'} /> : column.render ? column.render(item) : item[column.key] || '-'}
                  </td>
                ))}
                <td>
                  <div className="hrms-actions">
                    <button onClick={() => toggleItem(type, item)}>{type === 'employees' ? (item.status === 'active' ? 'Deactivate' : 'Activate') : (item.isActive ? 'Deactivate' : 'Activate')}</button>
                    <button onClick={() => setEditing(item)}>Edit</button>
                    <button className="danger" onClick={() => setDeleting(item)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={config.columns.length + 1} className="hrms-empty">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <RecordModal
          title={editing.id ? `Edit ${config.createLabel}` : `Add ${config.createLabel}`}
          item={editing}
          config={config}
          data={data}
          onClose={() => setEditing(null)}
          onSave={(item) => { saveItem(type, item); setEditing(null); }}
        />
      )}

      {deleting && (
        <ConfirmModal
          item={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => { deleteItem(type, deleting.id); setDeleting(null); }}
        />
      )}
    </section>
  );
}

function PageHeading({ title, subtitle, action }) {
  return (
    <div className="hrms-heading">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StatusBadge({ value }) {
  const active = value === true || value === 'active';
  return <span className={`hrms-badge ${active ? 'active' : 'inactive'}`}>{active ? 'Active' : 'Inactive'}</span>;
}

function RecordModal({ title, item, config, data, onClose, onSave }) {
  const defaults = Object.fromEntries(config.fields.map((field) => [field.key, field.options?.[0] || '']));
  const [form, setForm] = useState({ ...defaults, ...item });
  const [error, setError] = useState('');

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const missing = config.fields.find((field) => field.required && !String(form[field.key] || '').trim());
    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }
    onSave(form);
  };

  return (
    <div className="hrms-modal-backdrop">
      <form className="hrms-modal" onSubmit={submit}>
        <div className="hrms-modal-head">
          <h2>{title}</h2>
          <button type="button" onClick={onClose}>x</button>
        </div>
        {error && <p className="hrms-form-error">{error}</p>}
        <div className="hrms-form-grid">
          {config.fields.map((field) => (
            <label key={field.key} className="hrms-form-field">
              <span>{field.label}{field.required ? ' *' : ''}</span>
              {field.options ? (
                <select value={form[field.key] || field.options[0]} onChange={(event) => updateField(field.key, event.target.value)}>
                  {field.options.map((option) => <option key={option} value={option}>{titleCase(option)}</option>)}
                </select>
              ) : field.source ? (
                <select value={form[field.key] || ''} onChange={(event) => updateField(field.key, event.target.value)}>
                  <option value="">Select {field.label}</option>
                  {(data[field.source] || []).map((sourceItem) => {
                    const value = sourceItem[field.sourceLabel];
                    return <option key={sourceItem.id} value={value}>{value}</option>;
                  })}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={form[field.key] || ''}
                  onChange={(event) => updateField(field.key, event.target.value)}
                />
              )}
            </label>
          ))}
        </div>
        <div className="hrms-modal-actions">
          <button type="button" className="hrms-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="hrms-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

function ConfirmModal({ item, onClose, onConfirm }) {
  const name = item.name || item.title || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'this record';
  return (
    <div className="hrms-modal-backdrop">
      <div className="hrms-modal small">
        <div className="hrms-modal-head">
          <h2>Confirm Delete</h2>
          <button type="button" onClick={onClose}>x</button>
        </div>
        <p>Are you sure you want to delete {name}? This action cannot be undone.</p>
        <div className="hrms-modal-actions">
          <button type="button" className="hrms-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="hrms-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <section>
      <PageHeading title="My Profile" subtitle="Admin account details" />
      <div className="hrms-card hrms-profile-card">
        <span className="hrms-profile-avatar">MA</span>
        <div>
          <h2>JALA Admin</h2>
          <p>admin@jalaacademy.com</p>
          <StatusBadge value="active" />
        </div>
      </div>
    </section>
  );
}


