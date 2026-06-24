import { MapPin } from 'lucide-react';
import HalalLogo from '../assets/halal-logo.svg';

export default function HeaderCard() {
  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 shadow-sm">
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pendaftaran Sertifikasi</p>
            <h1 className="mt-2 text-3xl font-bold text-emerald-800">Pendaftaran Sertifikasi SIHALAL</h1>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-3xl bg-emerald-50 p-4 shadow-sm ring-1 ring-emerald-100">
          <img src={HalalLogo} alt="Halal Logo" className="h-14 w-14 object-contain" />
        </div>
      </div>
    </div>
  );
}
