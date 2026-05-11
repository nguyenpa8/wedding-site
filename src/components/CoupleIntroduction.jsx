import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function CoupleIntroduction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { couple, introductionMessage } = weddingData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Decorative Line */}
          <motion.div className="mb-8 flex justify-center" variants={itemVariants}>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight"
            variants={itemVariants}
          >
            Chúng Mình Sắp Kết Hôn
          </motion.h1>

          {/* Decorative Line */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Couple Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Groom Section */}
          <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
            {/* Groom Portrait */}
            <motion.div
              className="mb-8 w-full max-w-xs"
              variants={imageVariants}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4]">
                <img
                  src={couple.groomPortrait}
                  alt={couple.groom}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Groom Name */}
            <motion.h2
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900"
              variants={itemVariants}
            >
              {couple.groom}
            </motion.h2>
          </motion.div>

          {/* Ampersand Divider */}
          <motion.div
            className="hidden md:flex justify-center items-center"
            variants={itemVariants}
          >
            <span className="text-6xl lg:text-7xl text-rose-300 font-serif font-light">&</span>
          </motion.div>

          {/* Bride Section */}
          <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
            {/* Bride Portrait */}
            <motion.div
              className="mb-8 w-full max-w-xs"
              variants={imageVariants}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4]">
                <img
                  src={couple.bridePortrait}
                  alt={couple.bride}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Bride Name */}
            <motion.h2
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900"
              variants={itemVariants}
            >
              {couple.bride}
            </motion.h2>
          </motion.div>

          {/* Mobile Ampersand */}
          <motion.div
            className="md:hidden flex justify-center my-4"
            variants={itemVariants}
          >
            <span className="text-5xl text-rose-300 font-serif font-light">&</span>
          </motion.div>
        </motion.div>

        {/* Introduction Message */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {introductionMessage}
          </motion.p>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
