import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState({ latitude: '', longitude: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported');
      setError('Geolocation tidak tersedia di browser ini.');
    }
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      setError('Geolocation tidak tersedia.');
      return;
    }

    setStatus('pending');
    navigator.geolocation.getCurrentPosition(
      (geo) => {
        setPosition({ latitude: geo.coords.latitude.toFixed(6), longitude: geo.coords.longitude.toFixed(6) });
        setStatus('success');
        setError(null);
      },
      (err) => {
        setStatus('error');
        setError(err.message || 'Gagal mendeteksi lokasi.');
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  return {
    position,
    status,
    error,
    requestLocation,
  };
}
