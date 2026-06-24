export function isValidPhone(value) {
  if (!value) return false;
  const normalized = value.trim().replace(/[^0-9+]/g, '');
  const digits = normalized.replace(/^\+/, '');
  return /^\d{10,15}$/.test(digits) && (/^08/.test(normalized) || /^\+628/.test(normalized));
}

export function isValidYear(value) {
  const year = Number(String(value).trim());
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1900 && year <= currentYear;
}

export function isValidCoordinates(lat, lng) {
  const latitude = Number(lat);
  const longitude = Number(lng);
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

export function collectFormData(form) {
  return {
    id: form.querySelector('[name="id"]').value.trim(),
    nama: form.querySelector('[name="nama"]').value.trim(),
    nama_usaha: form.querySelector('[name="nama_usaha"]').value.trim(),
    nama_produk: form.querySelector('[name="nama_produk"]').value.trim(),
    tahun_berdiri: form.querySelector('[name="tahun_berdiri"]').value.trim(),
    no_hp: form.querySelector('[name="no_hp"]').value.trim(),
    alamat: form.querySelector('[name="alamat"]').value.trim(),
    latitude: form.querySelector('[name="latitude"]').value.trim(),
    longitude: form.querySelector('[name="longitude"]').value.trim(),
    status_lokasi: form.querySelector('[name="status_lokasi"]').value.trim(),
  };
}

export function validateForm(form) {
  const data = collectFormData(form);
  const errors = {};

  if (!data.nama) errors.nama = 'Nama tidak boleh kosong.';
  if (!data.nama_usaha) errors.nama_usaha = 'Nama usaha tidak boleh kosong.';
  if (!data.nama_produk) errors.nama_produk = 'Nama produk tidak boleh kosong.';
  if (!isValidYear(data.tahun_berdiri)) errors.tahun_berdiri = 'Tahun berdiri harus angka antara 1900 hingga sekarang.';
  if (!isValidPhone(data.no_hp)) errors.no_hp = 'Nomor HP tidak valid. Gunakan 08xxxx atau +628xxxx.';
  if (!data.status_lokasi) errors.status_lokasi = 'Pilih status lokasi auto/manual.';
  if (!isValidCoordinates(data.latitude, data.longitude)) errors.latitude = 'Latitude dan longitude valid diperlukan.';

  return { valid: Object.keys(errors).length === 0, data, errors };
}

export function showValidation(form, errors) {
  form.querySelectorAll('.invalid-feedback').forEach((el) => {
    el.textContent = '';
    el.style.display = 'none';
  });

  Object.entries(errors).forEach(([key, message]) => {
    const feedback = form.querySelector(`[data-error-for="${key}"]`);
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  });
}
