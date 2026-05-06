"use client";

import React, { useState } from "react";
import Link from "next/link";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PaymentsIcon from "@mui/icons-material/Payments";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalBarIcon from "@mui/icons-material/LocalBar";

import comfortRoomImg from "../../../public/images/comfort-room.jpeg";
import classicRoomImg from "../../../public/images/classic-room.jpeg";
import doubleRoomImg from "../../../public/images/double-room.jpeg";
import { useLanguage } from "../Localization/LanguageContext";

const RoomsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const { t } = useLanguage();

  const rooms = [
    {
      id: 1,
      title: t.comfortRoom,
      image: comfortRoomImg.src,
      features: [
        { icon: <PaymentsIcon />, label: t.priceFrom5000 },
        { icon: <BedIcon />, label: t.doubleBed },
        { icon: <BathtubIcon />, label: t.hydromassage2 },
        { icon: <AcUnitIcon />, label: t.ac },
      ],
    },
    {
      id: 2,
      title: t.clasicRoom,
      image: classicRoomImg.src,
      features: [
        { icon: <PaymentsIcon />, label: t.priceFrom3800 },
        { icon: <BedIcon />, label: t.twoBeds },
        { icon: <AcUnitIcon />, label: t.ac },
        { icon: <TvIcon />, label: t.tv },
      ],
    },
    {
      id: 3,
      title: t.doubleRoom,
      image: doubleRoomImg.src,
      features: [
        { icon: <PaymentsIcon />, label: t.priceFrom4000 },
        { icon: <BedIcon />, label: t.doubleBed },
        { icon: <LocalBarIcon />, label: t.miniBar },
        { icon: <AcUnitIcon />, label: t.ac },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1,
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end to avoid stale data
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
    <div
      className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl group touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images Slider Container */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {rooms.map((room) => (
          <div key={room.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            {/* Slight dark overlay so the title text stays readable */}
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute top-6 left-6 text-white text-xl font-bold drop-shadow-md">
              {room.title}
            </div>
          </div>
        ))}
      </div>

      {/* Learn More Button (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-10">
        <Link
          href="/services"
          className="bg-white/90 hover:bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md backdrop-blur-sm transition-colors text-sm md:text-base cursor-pointer"
        >
          {t.accomodationButton}
        </Link>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    {/* Icons Section - Changes with currentIndex */}
    <div 
      key={currentIndex} 
      className="w-full max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-12 border-t border-zinc-800/50 pt-16"
    >
      {rooms[currentIndex].features.map((feature, idx) => (
        <div 
          key={idx} 
          className="flex flex-col items-center gap-4 group transition-all duration-1000 animate-in fade-in zoom-in-75 fill-mode-forwards"
          style={{ animationDelay: `${idx * 150}ms` }}
        >
          <div className="text-zinc-500 group-hover:text-white transition-colors duration-500 scale-110 md:scale-125">
            {feature.icon}
          </div>
          <span className="text-zinc-400 group-hover:text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-500 text-center px-2">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RoomsCarousel;
