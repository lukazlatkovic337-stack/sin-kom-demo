"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useHotelData } from "@/app/_shared/Localization/useHotelData";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import "../../style.css";

const CustomCarousel = ({
  images,
  altPrefix,
  onImageClick,
  initialSlide = 0,
  isModalView = false,
}: {
  images: string[];
  altPrefix: string;
  onImageClick?: (index: number) => void;
  initialSlide?: number;
  isModalView?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
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
      className={`relative w-full overflow-hidden rounded-3xl bg-black/20 border border-white/5 group ${isModalView ? 'h-[75vh] md:h-[85vh]' : 'h-64 sm:h-80 md:h-[500px] cursor-zoom-in'}`}
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
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 relative"
            onClick={() => !isModalView && onImageClick?.(index)}
          >
            <Image
              src={src}
              alt={`${altPrefix} ${index + 1}`}
              fill
              className={isModalView ? "object-contain" : "object-cover"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous image"
        className={`absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-[#EBD27D] hover:text-black text-white w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-20 border border-white/10 ${isModalView ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next image"
        className={`absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-[#EBD27D] hover:text-black text-white w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-20 border border-white/10 ${isModalView ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
                ? "bg-[#EBD27D] scale-y-125"
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

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: "",
  });

  useEffect(() => {
    document.title = "Galerija - Hotel Sin-Kom Pirot";
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (modalState.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalState.isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalState((prev) => ({ ...prev, isOpen: false }));
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openLightbox = (images: string[], index: number, title: string) => {
    setModalState({ isOpen: true, images, index, title });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-950 font-sans w-full pb-32">
      {/* Modal Popup Swiper */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 p-4">
          <button 
            onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
            className="absolute top-6 right-6 text-white/70 hover:text-[#EBD27D] transition-colors z-[10000] p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full max-w-7xl flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#EBD27D] uppercase tracking-widest text-center">
              {modalState.title}
            </h2>
            <CustomCarousel 
              images={modalState.images} 
              altPrefix={modalState.title} 
              initialSlide={modalState.index}
              isModalView={true}
            />
          </div>
        </div>
      )}

      <main className="flex w-full max-w-5xl flex-col items-center justify-start pt-32 px-4 sm:px-8 gap-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="galleryTitle text-6xl md:text-8xl font-light text-white text-center tracking-tighter">
            {t.gallery}
          </h1>
          <div className="w-24 h-1 bg-[#EBD27D]"></div>
        </div>

        {/* Reception Card */}
        <section className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#EBD27D]/50 transition-all duration-500 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EBD27D] uppercase tracking-widest px-2">
            {t.reception}
          </h2>
          <CustomCarousel 
            images={reception.images} 
            altPrefix={t.reception} 
            onImageClick={(idx) => openLightbox(reception.images, idx, t.reception)}
          />
        </section>

        {/* Conference Card */}
        <section className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#EBD27D]/50 transition-all duration-500 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EBD27D] uppercase tracking-widest px-2">
            {t.conferenceRoom}
          </h2>
          <CustomCarousel
            images={conference.images}
            altPrefix={t.conferenceRoom}
            onImageClick={(idx) => openLightbox(conference.images, idx, t.conferenceRoom)}
          />
        </section>

        {/* Rooms Cards */}
        {rooms.map((room) => (
          <section
            key={room.id}
            className="w-full flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] border border-white/10 hover:border-[#EBD27D]/50 transition-all duration-500 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#EBD27D] uppercase tracking-widest px-2">
              {room.name}
            </h2>
            <p className="text-white/60 px-2 text-lg italic leading-relaxed">
              {room.description}
            </p>
            <CustomCarousel 
              images={room.images} 
              altPrefix={room.name} 
              onImageClick={(idx) => openLightbox(room.images, idx, room.name)}
            />
          </section>
        ))}
      </main>
    </div>
  );
}
