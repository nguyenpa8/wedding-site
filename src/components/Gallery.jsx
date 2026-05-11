import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { weddingData } from '../data/weddingData.js'

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const handleImageClick = (index) => {
    setSelectedImage(weddingData.gallery[index]);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % weddingData.gallery.length;
    setSelectedImage(weddingData.gallery[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length;
    setSelectedImage(weddingData.gallery[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleClose = () => {
    setSelectedImage(null);
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
            Thư Viện Ảnh
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" />
        </motion.div>

        {/* 3-column portrait layout — desktop only, 2-col on mobile */}
        <motion.div
          className="hidden md:flex gap-5 items-start"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[0, 1, 2].map((col) => {
            const colImages = weddingData.gallery.filter((_, i) => i % 3 === col)
            const offsets = [0, 44, 22]
            const aspectVariants = ['aspect-[3/4]', 'aspect-[2/3]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[2/3]']
            return (
              <div
                key={col}
                className="flex flex-col gap-5 flex-1"
                style={{ marginTop: offsets[col] }}
              >
                {colImages.map((image, rowIdx) => {
                  const globalIdx = rowIdx * 3 + col
                  const aspect = aspectVariants[(rowIdx + col) % aspectVariants.length]
                  return (
                    <motion.div
                      key={globalIdx}
                      variants={itemVariants}
                      className="group cursor-pointer overflow-hidden rounded-2xl transition-all duration-500"
                      style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                      onClick={() => handleImageClick(globalIdx)}
                    >
                      <div className={`relative w-full ${aspect} overflow-hidden bg-gray-100`}>
                        <img
                          src={image}
                          alt={`Ảnh cưới ${globalIdx + 1}`}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </motion.div>

        {/* Mobile: 2-column portrait grid */}
        <motion.div
          className="md:hidden grid grid-cols-2 gap-3"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {weddingData.gallery.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer overflow-hidden rounded-xl"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginTop: index % 2 === 1 ? '16px' : '0' }}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`Ảnh cưới ${index + 1}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-10 right-0 text-white hover:text-rose-400 transition-colors duration-300 z-10"
                aria-label="Đóng"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Ảnh cưới full"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors duration-300 p-2"
                aria-label="Ảnh trước"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors duration-300 p-2"
                aria-label="Ảnh tiếp"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light">
                {currentIndex + 1} / {weddingData.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
