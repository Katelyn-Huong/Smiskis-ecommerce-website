import { useState, useEffect } from 'react';

export function HomePage() {
  const images = [
    '/images/yogapose.png',
    '/images/fightingpose.png',
    '/images/cheerpose.png',
    '/images/meditatepose.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="grid gap-4 bg-purple-200">
      <img
        src="/images/smiskisglow inthedarkbanner.gif"
        alt="smiskis glowing"
        className="mx-auto mb-4 rounded-xl "
      />
      <p className="text-xl text-center text-gray-800">
        Little mysterious creatures that lives in blind boxes and appears at
        night...
      </p>

      <img
        src={images[currentIndex]}
        alt="smiskis pose"
        className="mx-auto mb-4 rounded-xl md:w-56 max-h-56"
      />
    </div>
  );
}
