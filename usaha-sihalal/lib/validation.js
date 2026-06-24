const { trimString, normalizePhone, parseNumber } = require('./helpers');

function validatePhone(phone) {
  const normalized = normalizePhone(trimString(phone));
  if (!normalized) return false;
  const digits = normalized.replace(/^\+/, '');
  return /^\d{10,15}$/.test(digits) && normalized.startsWith('+628');
}

function validateYear(year) {
  const parsed = parseNumber(trimString(year));
  if (!parsed || !Number.isInteger(parsed)) return false;
  const currentYear = new Date().getFullYear();
  return parsed >= 1900 && parsed <= currentYear;
}

function validateCoordinates(latitude, longitude) {
  const lat = parseNumber(latitude);
  const lng = parseNumber(longitude);
  return lat !== null && lng !== null && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function sanitizeString(value) {
  return trimString(value || '');
}

function validatePayload(payload, isUpdate = false) {
  const data = {
    id: sanitizeString(payload.id),
    nama: sanitizeString(payload.nama),
    nama_usaha: sanitizeString(payload.nama_usaha),
    nama_produk: sanitizeString(payload.nama_produk),
    tahun_berdiri: sanitizeString(payload.tahun_berdiri),
    no_hp: normalizePhone(sanitizeString(payload.no_hp)),
    alamat: sanitizeString(payload.alamat),
    latitude: sanitizeString(payload.latitude),
    longitude: sanitizeString(payload.longitude),
    status_lokasi: sanitizeString(payload.status_lokasi),
  };

  if (!data.nama) return { valid: false, message: 'Nama tidak boleh kosong.' };
  if (!data.nama_usaha) return { valid: false, message: 'Nama usaha tidak boleh kosong.' };
  if (!data.nama_produk) return { valid: false, message: 'Nama produk tidak boleh kosong.' };
  if (!validateYear(data.tahun_berdiri)) return { valid: false, message: 'Tahun berdiri tidak valid.' };
  if (!validatePhone(data.no_hp)) return { valid: false, message: 'Nomor HP tidak valid. Gunakan format 08xxxx atau +628xxxx.' };
  if (!validateCoordinates(data.latitude, data.longitude)) return { valid: false, message: 'Koordinat lokasi tidak valid.' };
  if (!data.status_lokasi) return { valid: false, message: 'Status lokasi harus diisi.' };

  if (isUpdate && !data.id) return { valid: false, message: 'ID data tidak valid.' };

  return { valid: true, data };
}

module.exports = {
  validatePhone,
  validateYear,
  validateCoordinates,
  validatePayload,
};