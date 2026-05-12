import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData.js';

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMarried: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const weddingDate = new Date(weddingData.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isMarried: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          isMarried: false,
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <div className="bg-white rounded-xl px-5 py-4 sm:px-8 sm:py-6 min-w-[80px] sm:min-w-[110px] shadow-lg border border-rose-100 hover:shadow-xl transition-shadow duration-300">
        <span className="text-4xl sm:text-5xl font-serif font-bold text-rose-700">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}>
        {label}
      </p>
    </div>
  );

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
    hidden: { opacity: 0, y: 20 },
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center md:min-h-screen px-4 py-10 md:py-16 overflow-hidden"
    >
      <motion.div
        className="text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {timeRemaining.isMarried ? (
          <motion.div className="space-y-6" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <motion.h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-rose-700 tracking-tight" variants={itemVariants}>
              Chúng Tôi Đã Kết Hôn ❤️
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-gray-700 tracking-wide font-light" variants={itemVariants}>
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </motion.p>
          </motion.div>
        ) : (
          <>
            <motion.div className="mb-8 sm:mb-16 space-y-3" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight" variants={itemVariants}>
                Countdown
              </motion.h2>
              <motion.div className="h-1 w-16 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" variants={itemVariants} />
              <motion.p className="text-gray-600 text-base sm:text-lg tracking-wide font-light mt-4" variants={itemVariants}>
                {weddingData.couple.bride} & {weddingData.couple.groom}
              </motion.p>
            </motion.div>

            <motion.div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 md:p-14 border border-white/20" variants={itemVariants}>
              <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                <motion.div variants={itemVariants}><TimeUnit value={timeRemaining.days} label="Ngày" /></motion.div>
                <motion.div variants={itemVariants}><TimeUnit value={timeRemaining.hours} label="Giờ" /></motion.div>
                <motion.div variants={itemVariants}><TimeUnit value={timeRemaining.minutes} label="Phút" /></motion.div>
                <motion.div variants={itemVariants}><TimeUnit value={timeRemaining.seconds} label="Giây" /></motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
}
