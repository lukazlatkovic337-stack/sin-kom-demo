"use client";

import { useState } from "react";
import Image from "next/image";
import { useHotelData } from "@/app/_shared/Localization/useHotelData";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import "../../style.css";

const CustomCarousel = ({
  images,
  altPrefix,
}: {
  images: string[];
  altPrefix: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in pixels) to trigger a slide change
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
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
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      // Swipe Right - Previous Slide
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div
      className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden rounded-3xl bg-black/20 border border-white/5 group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Images Container */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={src}
              alt={`${altPrefix} ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous image"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-[#fcd949] hover:text-black text-white w-12 h-12 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/10"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-[#fcd949] hover:text-black text-white w-12 h-12 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/10"
      >
        &#10095;
      </button>

      {/* Navigation Lines / Dashes */}
      <div className="absolute bottom-6 left-0 w-full px-10 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`flex-1 h-[4px] rounded-full transition-all duration-500 cursor-pointer ${
              currentIndex === index
                ? "bg-[#fcd949] scale-y-125"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Galery() {
  const { rooms, conference, reception } = useHotelData();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-950 font-sans w-full pb-32">
      <main className="flex w-full max-w-5xl flex-col items-center justify-start pt-32 px-4 sm:px-8 gap-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="galleryTitle text-6xl md:text-8xl font-light text-white text-center tracking-tighter">
            {t.gallery}
          </h1>
          <div className="w-24 h-1 bg-[#fcd949]"></div>
        </div>

        {/* Reception Card */}
        <section className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#fcd949]/50 transition-all duration-500 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#fcd949] uppercase tracking-widest px-2">
            {t.reception}
          </h2>
          <CustomCarousel images={reception.images} altPrefix={t.reception} />
        </section>

        {/* Conference Card */}
        <section className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#fcd949]/50 transition-all duration-500 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#fcd949] uppercase tracking-widest px-2">
            {t.conferenceRoom}
          </h2>
          <CustomCarousel
            images={conference.images}
            altPrefix={t.conferenceRoom}
          />
        </section>

        {/* Rooms Cards */}
        {rooms.map((room) => (
          <section
            key={room.id}
            className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#fcd949]/50 transition-all duration-500 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#fcd949] uppercase tracking-widest px-2">
              {room.name}
            </h2>
            <p className="text-white/60 px-2 text-lg italic leading-relaxed">
              {room.description}
            </p>
            <CustomCarousel images={room.images} altPrefix={room.name} />
          </section>
        ))}
      </main>
    </div>
  );
}
