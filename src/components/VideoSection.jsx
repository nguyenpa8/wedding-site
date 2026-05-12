import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function VideoSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        ref={containerRef}
        className="max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="mb-14 sm:mb-16 lg:mb-18 space-y-4" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-gray-900 font-serif font-bold tracking-tight text-center">
            Xem video cưới của chúng tôi!
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" />
        </motion.div>

        {/* Video Container - 16:9 Aspect Ratio */}
        <motion.div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-black border border-gray-100" variants={itemVariants}>
          <iframe
            className="w-full h-full"
            src={weddingData.youtubeEmbedUrl}
            title="Wedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
