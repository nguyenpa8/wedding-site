import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { weddingData } from '../data/weddingData.js';

export default function InfoLocation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const handleOpenMaps = (mapLink) => {
    if (mapLink) {
      window.open(mapLink, '_blank');
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 px-4 overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-16 space-y-4" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-center text-gray-900 tracking-tight">
            Địa Điểm
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" />
          <p className="text-center text-gray-600 text-lg tracking-wide font-light max-w-2xl mx-auto">
            Lễ cưới sẽ được tổ chức tại hai địa điểm
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {/* Groom's House Card */}
          <motion.div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 border border-gray-100 group" variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-600 mb-6 group-hover:text-rose-700 transition-colors">
              {weddingData.locations.groom.title}
            </h3>
            <div className="flex items-center gap-2 text-rose-500 font-semibold text-xl mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {weddingData.locations.groom.time}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
              {weddingData.locations.groom.address}
            </p>
            <button
              onClick={() => handleOpenMaps(weddingData.locations.groom.mapLink)}
              disabled={!weddingData.locations.groom.mapLink}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
                weddingData.locations.groom.mapLink
                  ? 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Open in Google Maps
            </button>
          </motion.div>

          {/* Bride's House Card */}
          <motion.div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 border border-gray-100 group" variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-600 mb-6 group-hover:text-rose-700 transition-colors">
              {weddingData.locations.bride.title}
            </h3>
            <div className="flex items-center gap-2 text-rose-500 font-semibold text-xl mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {weddingData.locations.bride.time}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
              {weddingData.locations.bride.address}
            </p>
            <button
              onClick={() => handleOpenMaps(weddingData.locations.bride.mapLink)}
              disabled={!weddingData.locations.bride.mapLink}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
                weddingData.locations.bride.mapLink
                  ? 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Open in Google Maps
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
