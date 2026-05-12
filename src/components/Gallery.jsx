import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { weddingData } from '../data/weddingData.js'
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import './Gallery.css';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  const desktopImages = weddingData.gallery.slice(0, 9);
  const mobileImages = weddingData.gallery.slice(0, 10);

  const slides = weddingData.gallery.map((src) => ({ src }));

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleViewAll = () => {
    setCurrentIndex(0);
    setLightboxOpen(true);
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
            Album Hình Cưới
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
            const colImages = desktopImages.filter((_, i) => i % 3 === col)
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
          {mobileImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer overflow-hidden rounded-xl"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
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

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12"
          variants={itemVariants}
        >
          <button
            onClick={handleViewAll}
            className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-300 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Xem Tất Cả Hình Ảnh
          </button>
        </motion.div>

        {/* Modern Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          plugins={[Thumbnails, Zoom]}
          thumbnails={{
            position: 'bottom',
            width: 80,
            height: 100,
            border: 0,
            borderRadius: 8,
            padding: 0,
            gap: 12,
            showToggle: false,
            vignette: false,
            imageFit: 'cover',
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
          animation={{
            fade: 250,
            swipe: 0,
            easing: {
              fade: 'ease-in-out',
              navigation: 'ease-in-out',
            },
          }}
          carousel={{
            finite: false,
            preload: 2,
            padding: 0,
            spacing: 0,
            imageFit: 'contain',
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
            closeOnPullUp: true,
          }}
          styles={{
            container: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
            },
            thumbnailsContainer: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
            },
            thumbnail: {
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
            },
            thumbnailActive: {
              border: '2px solid rgb(251, 113, 133)',
            },
            navigationPrev: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              transition: 'all 0.3s ease',
            },
            navigationNext: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              transition: 'all 0.3s ease',
            },
          }}
        />
      </motion.div>
    </section>
  )
}
