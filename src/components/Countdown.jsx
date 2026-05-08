import { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData.js';

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMarried: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const weddingDate = new Date(weddingData.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isMarried: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          isMarried: false,
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white rounded-lg px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[96px] shadow-sm">
        <span className="text-3xl sm:text-4xl font-serif font-bold text-rose-900">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm font-serif uppercase tracking-widest">
        {label}
      </p>
    </div>
  );

  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="text-center max-w-2xl">
        {timeRemaining.isMarried ? (
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-rose-700">
              Just Married ❤️
            </h2>
            <p className="text-base sm:text-lg text-gray-700 font-serif tracking-wide">
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 sm:mb-12 space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Counting Down
              </h2>
              <p className="text-gray-600 font-serif text-sm sm:text-base tracking-wide">
                {weddingData.couple.bride} & {weddingData.couple.groom}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 backdrop-blur-sm bg-opacity-70">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8">
                <TimeUnit value={timeRemaining.days} label="Days" />
                <TimeUnit value={timeRemaining.hours} label="Hours" />
                <TimeUnit value={timeRemaining.minutes} label="Minutes" />
                <TimeUnit value={timeRemaining.seconds} label="Seconds" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
