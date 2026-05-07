import { weddingData } from "../data/weddingData";

export default function Hero() {
  const { couple, weddingDate, heroImage } = weddingData;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Soft Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Line Top */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>

        {/* Groom Name */}
        <h2 className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light tracking-widest mb-2 sm:mb-3">
          {couple.groom}
        </h2>

        {/* Ampersand or 'and' separator */}
        <div className="my-2 sm:my-3 lg:my-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl text-white/60 font-light">
            &
          </span>
        </div>

        {/* Bride Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white font-light tracking-wide mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg">
          {couple.bride}
        </h1>

        {/* Decorative Line Bottom */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>

        {/* Wedding Date */}
        <p className="text-base sm:text-lg lg:text-xl text-white/70 font-light tracking-widest">
          {formatDate(weddingDate)}
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
