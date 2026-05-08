import { useState, useEffect } from "react";

const ImageDivider = ({
  image,
  height = "h-48 md:h-64 lg:h-80",
  overlay = "from-black/30 to-black/30",
  blur = true,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div
      className={`relative w-full ${height} overflow-hidden`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${overlay}`} />

      {/* Optional Blur Effect */}
      {blur && (
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(1px)",
          }}
        />
      )}

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent opacity-10" />
    </div>
  );
};

export default ImageDivider;
