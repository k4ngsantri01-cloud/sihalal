export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function setLoading(isLoading) {
  const overlay = qs('.loading-overlay');
  if (overlay) {
    overlay.classList.toggle('active', isLoading);
  }
}

export function showToast(message, type = 'success') {
  const toast = qs('.toast');
  const toastTitle = qs('.toast-title');
  const toastMessage = qs('.toast-message');
  if (!toast || !toastTitle || !toastMessage) return;
  toast.className = `toast show ${type}`;
  toastTitle.textContent = type === 'success' ? 'Berhasil' : 'Gagal';
  toastMessage.textContent = message;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

export function resetForm(form) {
  form.reset();
  qsa('.invalid-feedback', form).forEach((el) => {
    el.textContent = '';
    el.style.display = 'none';
  });
}

export function renderTableRows(data, container) {
  if (!Array.isArray(data) || !container) return;
  container.innerHTML = data
    .map((item) => {
      return `
        <tr data-id="${item.id}">
          <td>${item.nama}</td>
          <td>${item.nama_usaha}</td>
          <td>${item.nama_produk}</td>
          <td>${item.no_hp}</td>
          <td>${item.tahun_berdiri}</td>
          <td>${item.alamat || '-'}</td>
          <td>
            <div class="row-actions">
              <button class="button-secondary btn-edit" data-id="${item.id}">Edit</button>
              <button class="button-danger btn-delete" data-id="${item.id}">Hapus</button>
              <a class="button-secondary" href="https://maps.google.com/?q=${encodeURIComponent(item.latitude)},${encodeURIComponent(item.longitude)}" target="_blank">Lihat Maps</a>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

export function toggleModal(modalSelector, visible) {
  const modal = qs(modalSelector);
  if (modal) {
    modal.classList.toggle('active', visible);
  }
}

export function fillEditModal(item) {
  const modal = qs('#edit-modal');
  if (!modal || !item) return;
  modal.querySelector('[name="id"]').value = item.id;
  modal.querySelector('[name="nama"]').value = item.nama;
  modal.querySelector('[name="nama_usaha"]').value = item.nama_usaha;
  modal.querySelector('[name="nama_produk"]').value = item.nama_produk;
  modal.querySelector('[name="tahun_berdiri"]').value = item.tahun_berdiri;
  modal.querySelector('[name="no_hp"]').value = item.no_hp;
  modal.querySelector('[name="alamat"]').value = item.alamat;
  modal.querySelector('[name="latitude"]').value = item.latitude;
  modal.querySelector('[name="longitude"]').value = item.longitude;
  modal.querySelector('[name="status_lokasi"]').value = item.status_lokasi;
}

export function getSearchKeyword() {
  const input = qs('#search-input');
  return input ? input.value.trim().toLowerCase() : '';
}

export function filterData(data, keyword) {
  if (!keyword) return data;
  return data.filter((item) => {
    return [item.nama, item.nama_usaha, item.nama_produk, item.no_hp]
      .join(' ')
      .toLowerCase()
      .includes(keyword);
  });
}
