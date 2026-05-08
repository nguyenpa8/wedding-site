import { motion } from "framer-motion";

const FloatingHearts = () => {
  // Generate array of hearts with randomized properties
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 7,
    opacity: 0.3 + Math.random() * 0.5,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            top: "-30px",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 60 : 900,
            opacity: [0, heart.opacity, heart.opacity * 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <svg
            width={`${24 * heart.scale}px`}
            height={`${24 * heart.scale}px`}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-300/60 drop-shadow-sm blur-sm"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
