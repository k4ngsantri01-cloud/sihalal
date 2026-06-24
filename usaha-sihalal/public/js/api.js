async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan API.');
  }

  return data;
}

export function listUsaha() {
  return requestJson('/api/list');
}

export function getDetail(id) {
  return requestJson(`/api/detail?id=${encodeURIComponent(id)}`);
}

export function createUsaha(data) {
  return requestJson('/api/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateUsaha(data) {
  return requestJson('/api/update', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteUsaha(id) {
  return requestJson('/api/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}
