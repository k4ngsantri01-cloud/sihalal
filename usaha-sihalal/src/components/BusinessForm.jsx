import { motion } from 'framer-motion';

const fieldClasses = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200';

export default function BusinessForm({ register, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Nama</span>
          <input
            className={fieldClasses}
            type="text"
            {...register('nama', { required: 'Nama harus diisi.' })}
            placeholder="Masukkan nama"
            aria-invalid={errors.nama ? 'true' : 'false'}
          />
          {errors.nama && <p className="text-sm text-rose-500">{errors.nama.message}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Nama Usaha</span>
          <input
            className={fieldClasses}
            type="text"
            {...register('namaUsaha', { required: 'Nama usaha harus diisi.' })}
            placeholder="Nama usaha"
            aria-invalid={errors.namaUsaha ? 'true' : 'false'}
          />
          {errors.namaUsaha && <p className="text-sm text-rose-500">{errors.namaUsaha.message}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Nama Produk</span>
          <input
            className={fieldClasses}
            type="text"
            {...register('namaProduk', { required: 'Nama produk harus diisi.' })}
            placeholder="Produk utama"
            aria-invalid={errors.namaProduk ? 'true' : 'false'}
          />
          {errors.namaProduk && <p className="text-sm text-rose-500">{errors.namaProduk.message}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Tahun Berdiri</span>
          <input
            className={fieldClasses}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            {...register('tahunBerdiri', {
              required: 'Tahun berdiri harus diisi.',
              pattern: { value: /^[0-9]{4}$/, message: 'Masukkan tahun 4 digit.' },
              validate: (value) => Number(value) >= 1900 && Number(value) <= new Date().getFullYear() || 'Tahun berdiri tidak valid.',
            })}
            placeholder="2023"
            aria-invalid={errors.tahunBerdiri ? 'true' : 'false'}
          />
          {errors.tahunBerdiri && <p className="text-sm text-rose-500">{errors.tahunBerdiri.message}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">No HP</span>
          <input
            className={fieldClasses}
            type="tel"
            {...register('noHp', {
              required: 'Nomor HP harus diisi.',
              pattern: {
                value: /^(08|\+628)\d{8,13}$/,
                message: 'Nomor HP harus format Indonesia yang valid.',
              },
            })}
            placeholder="08xxxxxxxxxx atau +628xxxxxxxxxx"
            aria-invalid={errors.noHp ? 'true' : 'false'}
          />
          {errors.noHp && <p className="text-sm text-rose-500">{errors.noHp.message}</p>}
        </label>

        <label className="sm:col-span-2 xl:col-span-3 space-y-2">
          <span className="text-sm font-semibold text-slate-700">Alamat</span>
          <textarea
            className={fieldClasses}
            rows="4"
            {...register('alamat', { required: 'Alamat harus diisi.' })}
            placeholder="Alamat lengkap usaha"
            aria-invalid={errors.alamat ? 'true' : 'false'}
          />
          {errors.alamat && <p className="text-sm text-rose-500">{errors.alamat.message}</p>}
        </label>

        <label className="sm:col-span-2 xl:col-span-3 space-y-2">
          <span className="text-sm font-semibold text-slate-700">Status Lokasi</span>
          <select
            className={fieldClasses}
            {...register('statusLokasi', { required: 'Pilih status lokasi.' })}
            aria-invalid={errors.statusLokasi ? 'true' : 'false'}
          >
            <option value="">Pilih status</option>
            <option value="Lokasi Tetap">Lokasi Tetap</option>
            <option value="Lokasi Sementara">Lokasi Sementara</option>
            <option value="Belum Ditentukan">Belum Ditentukan</option>
          </select>
          {errors.statusLokasi && <p className="text-sm text-rose-500">{errors.statusLokasi.message}</p>}
        </label>
      </div>
      <input type="hidden" {...register('latitude')} />
      <input type="hidden" {...register('longitude')} />
    </motion.div>
  );
}
