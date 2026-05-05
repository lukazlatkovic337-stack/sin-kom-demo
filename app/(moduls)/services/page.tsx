"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, TouchEvent } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RoomService from "./RoomService/RoomService";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import "./style.css";

import KinoKonferenc from "@/public/images/konferencijska-kino.png";
import KoktelKonferenc from "@/public/images/konferencijska-koktel.png";
import { ROOMS } from "@/app/_shared/Localization/rooms";

export default function Serices() {
  const { t } = useLanguage();

  const [confIndex, setConfIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedConfType, setSelectedConfType] = useState<"kino" | "koktel">(
    "kino",
  );

  const conferenceImages = [
    "/images/Sin-kom/konferencijska-sala/slika1.JPG",
    "/images/Sin-kom/konferencijska-sala/slika2.JPG",
    "/images/Sin-kom/konferencijska-sala/slika3.JPG",
    "/images/Sin-kom/konferencijska-sala/slika4.JPG",
  ];

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextConfSlide();
    } else if (isRightSwipe) {
      prevConfSlide();
    }
  };

  const nextConfSlide = () => {
    setConfIndex((prev) =>
      prev === conferenceImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevConfSlide = () => {
    setConfIndex((prev) =>
      prev === 0 ? conferenceImages.length - 1 : prev - 1,
    );
  };

 

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans gap-responsive">
      <main className="flex flex-1 flex-col items-center justify-between w-[100%] services-main-container-padding">
        <div className="flex flex-col gap-[60px] w-full max-w-7xl">
          <div className="services-heading text-5xl md:text-8xl text-[#464545] font-black px-[20px] mt-2 text-center tracking-tighter">
            {t.servicesOfTheHotel}
          </div>
          <p className="text-black/70 text-center max-w-1xl mx-auto text-lg italic uppercase">
            {t.servicesDescription}
          </p>
          {ROOMS.map((room, index) => (
            <RoomService
              key={index}
              images={room.images}
              nameKey={room.nameKey}
              descriptionKey={room.descriptionKey}
              features={room.features}
              prices={room.prices}
            />
          ))}
        </div>
      </main>
      <div className="bg-[#e0d9cd] w-full px-4 lg:px-[100px] pb-10">
        <div className="text-[24px] text-black font-bold pt-[20px] px-[20px] mb-6">
          {t.conferenceRoom}
        </div>

        <div
          className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg group touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          {/* Images Gallery */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${confIndex * 100}%)` }}
          >
            {conferenceImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Conference view ${idx + 1}`}
                className="w-full h-[300px] md:h-[500px] object-cover flex-shrink-0"
                draggable="false"
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevConfSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>
          <button
            onClick={nextConfSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>

          {/* Pagination Dashes */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {conferenceImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setConfIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  confIndex === idx
                    ? "w-8 bg-white"
                    : "w-4 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="conference-text-wrapper gap-[20px]">
          <div className="flex flex-col">
            <p>{t.conferenceText1}</p>
            <br />
            <p>{t.conferenceText2}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-[40px] items-center md:items-start">
            {/* Left side selectors */}
            <div className="flex flex-row gap-[20px]">
              <div
                className={`flex flex-col gap-[10px] items-center content-center cursor-pointer p-4 rounded-xl transition-all ${selectedConfType === "kino" ? "bg-white/60 shadow-md scale-105" : "opacity-70 hover:opacity-100 hover:bg-white/30"}`}
                onClick={() => setSelectedConfType("kino")}
              >
                <img src={KinoKonferenc.src} alt="Kino"></img>
                <label className="text-[#464545] cursor-pointer font-medium">
                  Kino
                </label>
              </div>
              <div
                className={`flex flex-col gap-[10px] items-center content-center cursor-pointer p-4 rounded-xl transition-all ${selectedConfType === "koktel" ? "bg-white/60 shadow-md scale-105" : "opacity-70 hover:opacity-100 hover:bg-white/30"}`}
                onClick={() => setSelectedConfType("koktel")}
              >
                <img src={KoktelKonferenc.src} alt="Koktel"></img>
                <label className="text-[#464545] cursor-pointer font-medium">
                  Koktel
                </label>
              </div>
            </div>

            {/* Right side information */}
            <div className="flex flex-col justify-center text-[#464545] p-4 bg-white/30 rounded-xl md:max-w-[400px] w-full min-h-[140px]">
              {selectedConfType === "kino" ? (
                <div>
                  <h3 className="font-bold text-lg mb-2">{t.kinoKonf}</h3>
                  <p>{t.konfSto}</p>
                  <p>{t.stoliceTabla}</p>
                  <p>{t.projektor}</p>
                  <p>{t.platno}</p>
                  <p>{t.wifi}</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-lg mb-2">{t.koktelKonf}</h3>
                  <p>{t.razmestajKoktel}</p>
                  <p>{t.visokiStolovi}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-8 w-full max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-[#464545] mb-6 text-center md:text-left">
              <p>{t.pricing}</p>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Short term */}
              <div className="bg-white/40 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-white/60 hover:bg-white/60 transition-all">
                <span className="text-sm uppercase tracking-wider font-semibold text-[#464545]/70 mb-2">
                <p>{t.upToHours}</p>
                </span>
                <span className="text-4xl font-extrabold text-[#464545]">
                  1500 <span className="text-xl font-medium">RSD</span>
                </span>
                <span className="text-sm mt-2 text-center text-[#464545]">
                  <p>{t.perHour}</p>
                </span>
              </div>

              {/* Option 2: Long term */}
              <div className="bg-white/40 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-white/60 hover:bg-white/60 transition-all">
                <span className="text-sm uppercase tracking-wider font-semibold text-[#464545]/70 mb-2">
                  <p>{t.moreHours}</p>
                </span>
                <span className="text-4xl font-extrabold text-[#464545]">
                  1200 <span className="text-xl font-medium">RSD</span>
                </span>
                <span className="text-sm mt-2 text-center text-[#464545]">
                  <p>{t.perHour}</p>
                </span>
              </div>

              {/* Option 3: Guests */}
              <div className="bg-[#464545] text-[#e0d9cd] rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:bg-[#383737] transition-all transform hover:-translate-y-1">
                <span className="text-sm uppercase tracking-wider font-semibold text-[#e0d9cd]/80 mb-2">
                  <h3>{t.hotelGuests}</h3>
                </span>
                <span className="text-4xl font-extrabold text-white">
                  1000 <span className="text-xl font-medium">RSD</span>
                </span>
                <span className="text-sm mt-2 text-center text-[#e0d9cd]/90">
                  <h3>{t.perHour}</h3>
                </span>
              </div>
            </div>

            {/* Contact Button */}
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="bg-[#464545] text-[#e0d9cd] px-10 py-3 rounded-xl font-bold text-lg tracking-wide hover:bg-[#383737] transition-all transform hover:-translate-y-1 shadow-md"
              >
                <h3>{t.contactButton}</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
