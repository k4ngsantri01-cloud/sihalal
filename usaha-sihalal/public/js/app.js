import { qs, qsa, setLoading, showToast, resetForm, renderTableRows, toggleModal, fillEditModal, getSearchKeyword, filterData } from './ui.js';
import { validateForm, showValidation, collectFormData } from './validation.js';
import { loadLeaflet, updateLocationFields } from './maps.js';
import { listUsaha, createUsaha, updateUsaha, deleteUsaha, getDetail } from './api.js';

const state = {
  data: [],
  selectedData: null,
  searchKeyword: '',
};

async function loadMapComponent() {
  const container = qs('#map-component');
  if (!container) return;
  try {
    const response = await fetch('./components/maps.html');
    if (response.ok) {
      container.innerHTML = await response.text();
    }
  } catch (error) {
    console.error('loadMapComponent error', error);
  }
}

async function refreshTable() {
  try {
    setLoading(true);
    const response = await listUsaha();
    state.data = response.data || [];
    state.searchKeyword = getSearchKeyword();
    const filtered = filterData(state.data, state.searchKeyword);
    renderTableRows(filtered, qs('#table-body'));
    bindTableActions();
  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    setLoading(false);
  }
}

function bindTableActions() {
  qsa('.btn-edit').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      try {
        setLoading(true);
        const response = await getDetail(id);
        state.selectedData = response.data;
        fillEditModal(state.selectedData);
        toggleModal('#edit-modal', true);
      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoading(false);
      }
    });
  });

  qsa('.btn-delete').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      state.selectedData = state.data.find((item) => item.id === id);
      toggleModal('#delete-modal', true);
    });
  });
}

function bindForm() {
  const form = qs('#form-usaha');
  const resetButton = qs('#btn-reset');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const validation = validateForm(form);
    if (!validation.valid) {
      showValidation(form, validation.errors);
      return;
    }

    try {
      setLoading(true);
      if (validation.data.id) {
        await updateUsaha(validation.data);
        showToast('Data berhasil diperbarui.', 'success');
      } else {
        await createUsaha(validation.data);
        showToast('Data berhasil disimpan.', 'success');
      }
      resetForm(form);
      const statusText = qs('#location-status');
      if (statusText) {
        statusText.textContent = 'Silakan pilih lokasi atau gunakan deteksi otomatis.';
      }
      await refreshTable();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      resetForm(form);
      const statusText = qs('#location-status');
      if (statusText) {
        statusText.textContent = 'Silakan pilih lokasi atau gunakan deteksi otomatis.';
      }
    });
  }
}

function bindSearch() {
  const searchInput = qs('#search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    state.searchKeyword = getSearchKeyword();
    const filtered = filterData(state.data, state.searchKeyword);
    renderTableRows(filtered, qs('#table-body'));
    bindTableActions();
  });
}

function bindModals() {
  const closeButtons = qsa('[data-close-modal]');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      toggleModal('#edit-modal', false);
      toggleModal('#delete-modal', false);
    });
  });

  const deleteConfirmButton = qs('#btn-delete-confirm');
  if (deleteConfirmButton) {
    deleteConfirmButton.addEventListener('click', async () => {
      if (!state.selectedData) return;
      try {
        setLoading(true);
        await deleteUsaha(state.selectedData.id);
        showToast('Data berhasil dihapus.', 'success');
        toggleModal('#delete-modal', false);
        await refreshTable();
      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoading(false);
      }
    });
  }
}

function bindEditModalSubmit() {
  const form = qs('#edit-form');
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = collectFormData(form);
    const errors = {};
    if (!data.nama) errors.nama = 'Nama tidak boleh kosong.';
    if (!data.nama_usaha) errors.nama_usaha = 'Nama usaha tidak boleh kosong.';
    if (!data.nama_produk) errors.nama_produk = 'Nama produk tidak boleh kosong.';
    if (!data.tahun_berdiri || !/^[0-9]+$/.test(data.tahun_berdiri) || Number(data.tahun_berdiri) < 1900 || Number(data.tahun_berdiri) > new Date().getFullYear()) {
      errors.tahun_berdiri = 'Tahun berdiri tidak valid.';
    }
    if (!/^(08|\+628)\d{8,13}$/.test(data.no_hp.replace(/[^0-9+]/g, ''))) {
      errors.no_hp = 'Nomor HP tidak valid.';
    }
    if (!data.status_lokasi) errors.status_lokasi = 'Status lokasi harus diisi.';
    if (!data.latitude || !data.longitude) errors.latitude = 'Latitude dan longitude valid diperlukan.';

    if (Object.keys(errors).length) {
      showValidation(form, errors);
      return;
    }

    try {
      setLoading(true);
      await updateUsaha(data);
      showToast('Data berhasil diperbarui.', 'success');
      toggleModal('#edit-modal', false);
      await refreshTable();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  });
}

function fetchInitialData() {
  refreshTable();
}

async function initApp() {
  bindForm();
  bindSearch();
  bindModals();
  bindEditModalSubmit();
  await loadMapComponent();
  loadLeaflet();
  fetchInitialData();
}

window.addEventListener('DOMContentLoaded', initApp);
