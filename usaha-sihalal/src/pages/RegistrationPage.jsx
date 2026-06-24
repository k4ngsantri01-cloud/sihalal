import { motion } from 'framer-motion';
import HeaderCard from '../components/HeaderCard.jsx';
import InfoCard from '../components/InfoCard.jsx';
import BusinessForm from '../components/BusinessForm.jsx';
import LocationMap from '../components/LocationMap.jsx';
import CoordinateFields from '../components/CoordinateFields.jsx';
import ActionButtons from '../components/ActionButtons.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function RegistrationPage() {
  const { position, status, error, requestLocation } = useGeolocation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: '',
      namaUsaha: '',
      namaProduk: '',
      tahunBerdiri: '',
      noHp: '',
      alamat: '',
      statusLokasi: '',
      latitude: '',
      longitude: '',
    },
  });

  useEffect(() => {
    if (status === 'success' && position.latitude && position.longitude) {
      setValue('latitude', position.latitude);
      setValue('longitude', position.longitude);
    }
  }, [position, status, setValue]);

  const onSubmit = (data) => {
    if (!position.latitude || !position.longitude) {
      return;
    }
    alert('Data berhasil disimpan.');
    reset();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-hero-gradient bg-cover bg-center px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-[1100px] rounded-[32px] bg-white/80 p-6 shadow-glass backdrop-blur-xl ring-1 ring-slate-200/70">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <HeaderCard />
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_0.55fr]">
            <div className="space-y-6">
              <InfoCard />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <BusinessForm register={register} errors={errors} />
                <div className="space-y-6 lg:hidden">
                  <LocationMap
                    position={position}
                    status={status}
                    error={error}
                    onDetect={requestLocation}
                  />
                  <CoordinateFields position={position} />
                </div>
                <ActionButtons onReset={handleReset} />
              </form>
            </div>

            <div className="space-y-6 hidden lg:block">
              <LocationMap
                position={position}
                status={status}
                error={error}
                onDetect={requestLocation}
              />
              <CoordinateFields position={position} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
