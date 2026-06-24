function trimString(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function normalizePhone(phone) {
  if (typeof phone !== 'string') return '';
  let digits = phone.replace(/[^0-9+]/g, '');
  if (digits.startsWith('+')) {
    if (digits.startsWith('+628')) {
      return digits;
    }
    digits = digits.slice(1);
  }
  if (digits.startsWith('628')) {
    return `+${digits}`;
  }
  if (digits.startsWith('08')) {
    return `+62${digits.slice(1)}`;
  }
  return '';
}

function formatId(sequence, date = new Date()) {
  const pad = String(sequence).padStart(4, '0');
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `USAHA-${yyyy}${mm}${dd}-${pad}`;
}

function createMapsLink(lat, lng) {
  return `https://maps.google.com/?q=${encodeURIComponent(lat)},${encodeURIComponent(lng)}`;
}

function parseNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Request body invalid JSON.'));
      }
    });
    req.on('error', reject);
  });
}

module.exports = {
  trimString,
  normalizePhone,
  formatId,
  createMapsLink,
  parseNumber,
  parseRequestBody,
};