"use client";

import { useState, useEffect } from "react";
import swiper1 from "../../public/images/swiper1.jpeg";
import swiper2 from "../../public/images/swiper2.jpeg";
import swiper3 from "../../public/images/swiper3.jpeg";
import swiper4 from "../../public/images/swiper4.jpeg";
import swiper5 from "../../public/images/swiper5.jpeg";

const images = [
  swiper1.src,
  swiper2.src,
  swiper3.src,
  swiper4.src,
  swiper5.src,
];

const SwiperMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in pixels) to trigger a slide change
  const minSwipeDistance = 50;

  const triggerTransition = (nextIndex: number) => {
    if (isTransitioning || nextIndex === currentIndex) return;

    setIsTransitioning(true);
    // Wait for fade out (500ms) before changing the index
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-scroll timer
  useEffect(() => {
    const timer = setInterval(() => {
      triggerTransition((currentIndex + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end to prevent false positives from previous swipes
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe Left - Next Slide
      triggerTransition((currentIndex + 1) % images.length);
    } else if (isRightSwipe) {
      // Swipe Right - Previous Slide
      triggerTransition(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    }
  };

  return (
    <section
      className="relative w-full h-dvh overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fading Images Container */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              currentIndex === index && !isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Optional dark overlay to make potential text readable */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Navigation Lines */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => triggerTransition(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-[4px] w-10 bg-white/30 rounded-full overflow-hidden cursor-pointer"
          >
            {(currentIndex === index || (currentIndex === index && isTransitioning)) && (
              <div 
                className={`absolute inset-0 bg-white ${!isTransitioning ? 'animate-progress-fill' : ''}`} 
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SwiperMain;