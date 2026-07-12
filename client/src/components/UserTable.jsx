import React from 'react';

export default function UserTable({ users = [], onEditUser, onDeleteUser }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return dateStr; // Safe fallback if parsing fails
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge badge-active';
      case 'Inactive':
        return 'badge badge-inactive';
      case 'Suspended':
        return 'badge badge-suspended';
      case 'Expired':
        return 'badge badge-expired';
      case 'Blocked':
        return 'badge badge-blocked';
      default:
        return 'badge badge-unknown';
    }
  };

  return (
    <div className="table-responsive">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Joining Date</th>
            <th>Inactive On</th>
            <th>Status</th>
            <th>Message</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-records">
                No user accounts found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.joining_date)}</td>
                <td>{formatDate(user.inactive_on)}</td>
                <td>
                  <span className={getStatusBadgeClass(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td className="user-message" title={user.message}>
                  {user.message || '-'}
                </td>
                <td className="actions-cell">
                  <button
                    type="button"
                    className="btn-action btn-edit"
                    onClick={() => onEditUser(user)}
                    aria-label={`Edit ${user.name}`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-action btn-delete"
                    onClick={() => onDeleteUser(user.id)}
                    aria-label={`Delete ${user.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
