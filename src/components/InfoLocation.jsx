import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { weddingData } from '../data/weddingData.js';

export default function InfoLocation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      className="relative py-12 md:py-24 px-4 overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-8 md:mb-16 space-y-4" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-center text-gray-900 tracking-tight">
            Địa Điểm
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" />
          <p className="text-center text-gray-600 text-lg tracking-wide font-light max-w-2xl mx-auto">
            Lễ cưới sẽ được tổ chức tại hai địa điểm
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {[weddingData.locations.bride, weddingData.locations.groom].map((loc) => (
            <motion.div
              key={loc.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 md:p-10 border border-gray-100 group flex flex-col"
              variants={itemVariants}
            >
              {/* Card Title */}
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-600 mb-5 group-hover:text-rose-700 transition-colors">
                {loc.title}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2 text-gray-500 mb-7">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-base leading-relaxed font-light">{loc.address}</p>
              </div>

              {/* Mini Timeline */}
              {loc.schedule && loc.schedule.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-4">Lịch trình</p>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-px bg-rose-100" />
                    <div className="space-y-4">
                      {loc.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          {/* Dot */}
                          <div className="relative shrink-0 w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center z-10">
                            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          {/* Content */}
                          <div className="flex items-baseline gap-3">
                            <span className="text-lg font-bold text-rose-600 font-serif tabular-nums">{item.time}</span>
                            <span className="text-base text-gray-600 font-light">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Maps Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleOpenMaps(loc.mapLink)}
                  disabled={!loc.mapLink}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-shadow duration-300 ${
                    loc.mapLink
                      ? 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Open in Google Maps
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
