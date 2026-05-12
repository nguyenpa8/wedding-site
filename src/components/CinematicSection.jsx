import { motion } from "framer-motion";

const CinematicSection = ({
  image,
  height = "min-h-[400px] md:min-h-[500px] lg:min-h-[600px]",
  overlay = "from-black/40 via-black/30 to-black/40",
  children,
  className = "",
}) => {

  return (
    <section
      className={`relative w-full overflow-hidden ${height} ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Dark Overlay for Readability */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />

      {/* Soft Vignette Effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Content - Optional */}
      {children && (
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
};

export default CinematicSection;
