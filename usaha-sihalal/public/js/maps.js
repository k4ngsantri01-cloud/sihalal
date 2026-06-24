const mapState = {
  map: null,
  marker: null,
  currentPosition: null,
  mode: 'manual',
};

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  mapState.map = L.map(mapElement).setView([-6.1751, 106.8650], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(mapState.map);

  mapState.marker = L.marker([-6.1751, 106.8650], { draggable: true }).addTo(mapState.map);
  mapState.marker.on('dragend', async () => {
    const latlng = mapState.marker.getLatLng();
    await updateLocationFields(latlng.lat, latlng.lng, 'manual');
  });

  mapState.map.on('click', async (event) => {
    const { lat, lng } = event.latlng;
    mapState.marker.setLatLng(event.latlng);
    await updateLocationFields(lat, lng, 'manual');
  });
}

async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`);
    if (!response.ok) {
      throw new Error('Reverse geocoding gagal');
    }
    const data = await response.json();
    return data.display_name || '';
  } catch (error) {
    console.error('reverseGeocode error', error);
    return '';
  }
}

export async function updateLocationFields(lat, lng, mode = 'manual') {
  const latInput = document.querySelector('[name="latitude"]');
  const lngInput = document.querySelector('[name="longitude"]');
  const addressInput = document.querySelector('[name="alamat"]');
  const statusInput = document.querySelector('[name="status_lokasi"]');
  const statusText = document.getElementById('location-status');

  if (latInput && lngInput && statusInput) {
    latInput.value = String(lat);
    lngInput.value = String(lng);
    statusInput.value = mode;
  }

  if (addressInput) {
    const address = await reverseGeocode(lat, lng);
    if (address) {
      addressInput.value = address;
    }
  }

  if (statusText) {
    statusText.textContent = mode === 'auto' ? 'Lokasi otomatis berhasil dideteksi.' : 'Lokasi ditetapkan secara manual.';
  }

  if (mapState.marker) {
    mapState.marker.setLatLng([lat, lng]);
  }

  if (mapState.map) {
    mapState.map.setView([lat, lng], 14);
  }
}

export async function requestGeolocation() {
  const statusText = document.getElementById('location-status');
  try {
    if (!navigator.geolocation) {
      throw new Error('Geolocation tidak tersedia.');
    }

    if (statusText) {
      statusText.textContent = 'Mencari lokasi...';
    }

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 12000,
      });
    });

    const { latitude, longitude } = position.coords;
    mapState.mode = 'auto';
    await updateLocationFields(latitude, longitude, 'auto');
  } catch (error) {
    console.error('requestGeolocation error', error);
    mapState.mode = 'manual';
    if (statusText) {
      statusText.textContent = 'Geolocation gagal. Silakan tetapkan lokasi secara manual.';
    }
  }
}

function bindMapButtons() {
  const geoButton = document.getElementById('btn-location');
  const manualButton = document.getElementById('btn-manual');

  if (geoButton) {
    geoButton.addEventListener('click', async () => {
      await requestGeolocation();
    });
  }

  if (manualButton) {
    manualButton.addEventListener('click', () => {
      mapState.mode = 'manual';
      const statusText = document.getElementById('location-status');
      if (statusText) {
        statusText.textContent = 'Mode manual aktif. Klik peta untuk memilih lokasi.';
      }
    });
  }
}

export function loadLeaflet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => {
    initMap();
    bindMapButtons();
  };
  document.body.appendChild(script);
}
