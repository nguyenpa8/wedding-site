import { useEffect, useRef, useState } from "react";
import { weddingData } from "../data/weddingData";

export default function VideoSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Container */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Decorative Line */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-light tracking-wide mb-12 sm:mb-14 lg:mb-16 text-center">
          Our Story
        </h2>

        {/* Video Container - 16:9 Aspect Ratio */}
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-black">
          <iframe
            className="w-full h-full"
            src={weddingData.youtubeEmbedUrl}
            title="Wedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Decorative Line Bottom */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
