const DEFAULT_API_URL = 'https://accounts-crud-backend.vercel.app';

const getApiUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL;
  return (configuredUrl && configuredUrl.trim() ? configuredUrl : DEFAULT_API_URL).replace(/\/+$/, '');
};

const API_URL = getApiUrl();

const readErrorMessage = async (response) => {
  try {
    const data = await response.json();
    const details = data.details || data.error || data.message;

    if (Array.isArray(details)) {
      return details.join(' ');
    }

    if (typeof details === 'string') {
      return details;
    }
  } catch {
    // Fall through to the generic HTTP message.
  }

  return `Request failed with status ${response.status}`;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const listCandidates = () => request('/api/users');

export const searchCandidateByPhone = (phone) => (
  request(`/api/users/search?phone=${encodeURIComponent(phone)}`)
);

export const createCandidate = (candidate) => (
  request('/api/users', {
    method: 'POST',
    body: JSON.stringify(candidate),
  })
);

export const updateCandidate = (id, candidate) => (
  request(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(candidate),
  })
);

export const deleteCandidate = (id) => (
  request(`/api/users/${id}`, {
    method: 'DELETE',
  })
);

export { API_URL };
