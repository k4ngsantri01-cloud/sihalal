import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [28, 42],
  iconAnchor: [14, 42],
});

export default function LocationMap({ position, status, error, onDetect }) {
  const lat = Number(position.latitude) || -6.200000;
  const lng = Number(position.longitude) || 106.816666;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Peta Lokasi</h2>
          <p className="mt-1 text-sm text-slate-500">Auto detect GPS untuk akurasi lokasi terbaik.</p>
        </div>
        <button
          type="button"
          onClick={onDetect}
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Deteksi GPS
        </button>
      </div>

      <div className="mt-5 h-[300px] overflow-hidden rounded-3xl border border-slate-200">
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full" zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <Marker position={[lat, lng]} icon={markerIcon} />
        </MapContainer>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-3xl bg-emerald-50/80 p-4 shadow-inner">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle className="h-5 w-5" />
          <p className="text-sm font-semibold">GPS: {status === 'success' ? 'Lokasi berhasil terdeteksi!' : status === 'pending' ? 'Mencari lokasi...' : 'Siap deteksi lokasi'}</p>
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
    </motion.section>
  );
}
