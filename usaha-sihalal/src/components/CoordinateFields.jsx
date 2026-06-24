import { motion } from 'framer-motion';

export default function CoordinateFields({ position }) {
  const mapsLink = position.latitude && position.longitude ? `https://maps.google.com/?q=${position.latitude},${position.longitude}` : '';

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      className="rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <h2 className="text-lg font-semibold text-slate-900">Koordinat & Link Maps</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Latitude</p>
          <p className="text-sm font-semibold text-slate-900">{position.latitude || '-'}</p>
        </div>
        <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Longitude</p>
          <p className="text-sm font-semibold text-slate-900">{position.longitude || '-'}</p>
        </div>
        <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Link Maps</p>
          <a href={mapsLink || '#'} className="block truncate text-sm font-semibold text-emerald-600" target="_blank" rel="noreferrer">
            {mapsLink || 'Belum tersedia'}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
