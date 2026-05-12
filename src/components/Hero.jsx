import { weddingData } from "../data/weddingData";
import { motion } from "framer-motion";

export default function Hero() {
  const { couple, weddingDate, heroImage } = weddingData;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle one-shot zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:82%_center] md:bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
      />

      {/* Gradient Overlay - Premium & Elegant */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      {/* Additional Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" style={{
        backgroundImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
      }} />

      {/* Decorative blur shapes removed for performance */}

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative Line Top */}
        <motion.div className="mb-6 sm:mb-8 lg:mb-10" variants={lineVariants}>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </motion.div>

        {/* Groom Name */}
        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-serif font-bold tracking-tight mb-3 sm:mb-4 lg:mb-5 drop-shadow-xl"
          variants={itemVariants}
        >
          {couple.groom}
        </motion.h2>

        {/* Ampersand or 'and' separator */}
        <motion.div className="my-3 sm:my-4 lg:my-5" variants={itemVariants}>
          <span className="text-4xl sm:text-5xl lg:text-6xl text-white/70 font-serif font-light">
            &
          </span>
        </motion.div>

        {/* Bride Name */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-serif font-bold tracking-tight mb-8 sm:mb-10 lg:mb-12 drop-shadow-xl"
          variants={itemVariants}
        >
          {couple.bride}
        </motion.h1>

        {/* Decorative Line Bottom */}
        <motion.div className="mb-10 sm:mb-12 lg:mb-14" variants={lineVariants}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </motion.div>

        {/* Wedding Date */}
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-white/75 font-light tracking-widest uppercase"
          variants={itemVariants}
        >
          {formatDate(weddingDate)}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 hover:text-white/75 transition-colors duration-300 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
