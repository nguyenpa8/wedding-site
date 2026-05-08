import { useState, useRef, useEffect } from 'react';
import { weddingData } from '../data/weddingData.js';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.autoplay = true;
    audio.loop = true;
    audio.volume = 0.3;

    if (!isMuted) {
      audio.play().catch(() => {
        // Autoplay may fail due to browser restrictions
        console.log('Autoplay blocked by browser');
      });
    } else {
      audio.pause();
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <audio ref={audioRef} loop>
        <source src={weddingData.musicUrl} type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 md:p-4 shadow-lg transition-all duration-200 backdrop-blur-sm"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 4.06c0-1.336-1.616-2.256-2.73-1.72l-5.24 3.02C5.04 5.62 4 7.066 4 8.72v6.56c0 1.654 1.04 3.16 2.53 3.86l5.24 3.02c1.11.64 2.73-.384 2.73-1.72V4.06zM15.5 12c0-1.25.756-2.312 1.838-2.8v5.6c-1.082-.488-1.838-1.55-1.838-2.8zm4.622-4.478A4.991 4.991 0 0021 11.964v.072a4.99 4.99 0 01-1.078 3.142M18 11.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 4.06c0-1.336-1.616-2.256-2.73-1.72l-5.24 3.02C5.04 5.62 4 7.066 4 8.72v6.56c0 1.654 1.04 3.16 2.53 3.86l5.24 3.02c1.11.64 2.73-.384 2.73-1.72V4.06zM15.5 12a4.5 4.5 0 009 0 4.5 4.5 0 00-9 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}
