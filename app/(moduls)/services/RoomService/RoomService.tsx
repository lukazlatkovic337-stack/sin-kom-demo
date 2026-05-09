"use client";

import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PhoneIcon from "@mui/icons-material/Phone";
import AirIcon from "@mui/icons-material/Air";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import BedIcon from "@mui/icons-material/Bed";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LockIcon from "@mui/icons-material/Lock";
import "./style.css";
import Link from "next/link";

type PriceOption = {
  labelKey: any;
  amount: string;
};

type Props = {
  images: string[];
  nameKey: any;
  descriptionKey: any;
  features?: string[];
  prices?: PriceOption[];
};

const RoomService = ({ images, nameKey, descriptionKey, features, prices }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { t } = useLanguage();
  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getIcon = (feature: string) => {
    switch (feature) {
      case "wifi": return <WifiIcon fontSize="small" />;
      case "wirelessInternet": return <WifiIcon fontSize="small" />;
      case "tv": return <TvIcon fontSize="small" />;
      case "ac": return <AcUnitIcon fontSize="small" />;
      case "phoneLine": return <PhoneIcon fontSize="small" />;
      case "hairdryer": return <AirIcon fontSize="small" />;
      case "sosAlarm": return <NotificationImportantIcon fontSize="small" />;
      case "twoBeds": return <BedIcon fontSize="small" />;
      case "doubleBed": return <BedIcon fontSize="small" />;
      case "digiSat": return <SettingsInputAntennaIcon fontSize="small" />;
      case "hydromassage": return <BathtubIcon fontSize="small" />;
      case "miniBar": return <LocalBarIcon fontSize="small" />;
      case "miniBarNote": return <LocalBarIcon fontSize="small" />;
      case "safe": return <LockIcon fontSize="small" />;
      case "airConditioned": return <AcUnitIcon fontSize="small" />;
      default: return null;
    }
  };

  const name = t[nameKey as keyof typeof t] || nameKey;
  const description = t[descriptionKey as keyof typeof t] || descriptionKey;

  return (
    <div className="room-card">
      {/* Left Side: Gallery */}
      <div className="flex flex-col gap-3 w-full lg:w-1/2">
        {/* Large Image with Arrows */}
        <div className="relative w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden group">
          <img
            src={images[currentIndex]}
            alt={`${name} - current view`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? "border-black dark:border-white"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Details */}
      <div className="flex flex-col w-full lg:w-1/2 py-4 px-2 min-h-full">
        <h2 className="description-text text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          {name}
        </h2>
        <p className="text-[#464545]/80 mb-8 text-sm md:text-base leading-relaxed italic">
          {description}
        </p>
        
        {/* Features Grid */}
        {features && (
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-10">
            {features.map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-[#464545] text-sm group/feat">
                <span className="text-[#7c6648] p-1.5 bg-white rounded-md shadow-sm transition-transform group-hover/feat:scale-110">
                  {getIcon(feat)}
                </span>
                <span className="font-medium">{t[feat as keyof typeof t] || feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pricing & CTA */}
        <div className="mt-auto pt-6 border-t border-[#7c6648]/20 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            {prices?.map((price, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#464545]/70 font-bold">
                  {t[price.labelKey as keyof typeof t]}
                </span>
                <span className="text-xl font-extrabold text-[#464545]">
                  {price.amount}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/reservation"
            className="custom-button-reserve whitespace-nowrap"
          >
            {t.reservationTop}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomService;
