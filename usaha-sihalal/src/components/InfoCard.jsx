import { UserCircle } from 'lucide-react';

export default function InfoCard() {
  return (
    <div className="rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="flex items-start gap-4">
        <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700">
          <UserCircle className="h-8 w-8" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Masukan data usaha dan produk Anda.</p>
          <p className="mt-2 text-sm text-slate-500">Titik lokasi Anda juga akan otomatis terdeteksi untuk pemetaan yang akurat.</p>
        </div>
      </div>
    </div>
  );
}
