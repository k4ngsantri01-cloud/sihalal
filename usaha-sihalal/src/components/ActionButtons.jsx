import { motion } from 'framer-motion';

export default function ActionButtons({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end"
    >
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center rounded-full bg-slate-400 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Reset Form
      </button>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-600 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Simpan Data
      </button>
    </motion.div>
  );
}
