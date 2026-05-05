"use client";

import { useState } from "react";
import Image from "next/image";
import SwiperMain from "./SwiperMain/SwiperMain";

import "./style.css";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WifiIcon from "@mui/icons-material/Wifi";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Icon } from "@mui/material";
import { useLanguage } from "./_shared/Localization/LanguageContext";
import RoomsCarousel from "./_shared/RoomsCarousel/RoomsCarousel";
import MarkImage from "@/public/images/markout10-circle.jpeg";
import { Link } from "react-aria-components";
import { useInView } from "./_shared/hooks/useInView";

export default function Home() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs for scroll animations
  const [heroRef, heroInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [iconsRef, iconsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [accomodationRef, accomodationInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [mainLinksRef, mainLinksInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [vicinityRef, vicinityInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [markRef, markInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full gap-[20px]  flex-col items-center justify-between ">
        <div className="relative w-full">
          <SwiperMain />
          <div ref={heroRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
            <h1 className={`swiperLine1 text-white text-6xl md:text-9xl font-bold text-center drop-shadow-2xl ${heroInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
              {t.swiperLine1}
            </h1>
            
            <h1 className={`swiperLine4 text-white text-4xl md:text-7xl font-bold text-center drop-shadow-2xl uppercase ${heroInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
              {t.swiperLine4}
            </h1>
            <p className={`swiperLine5 text-[#f7cd25] text-3xl md:text-5xl text-center drop-shadow-2xl mt-6  ${heroInView ? 'animate-fade-in-up delay-200' : 'reveal-hidden'}`}>
              {t.swiperLine5}
            </p>
          </div>
        </div>
        <div ref={aboutRef} className={`about-hotel-text-home ${aboutInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
          <ApartmentIcon style={{ fontSize: 70 }} />
          <h1 className="mainPageText font-semibold text-[32px] md:text-[52px] leading-tight text-center mb-6">
            {t.mainPageText}
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-7xl">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/homescreen-photo.png"
                alt="Hotel Sin-Kom"
                width={600}
                height={400}
              />
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
              <div className="mt-6 flex flex-col gap-4">
                <p>{t.paragraph1}</p>
                <div className={`${isExpanded ? 'flex' : 'hidden lg:flex'} flex-col gap-4`}>
                  <p>{t.paragraph2}</p>
                  <p>{t.paragraph3}</p>
                  <p>{t.paragraph4}</p>
                  <p>{t.paragraph6}</p>
                </div>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="lg:hidden text-[#7c6648] font-bold mt-2 uppercase text-xs tracking-widest self-center underline underline-offset-4"
                >
                  {isExpanded ? 'Prikaži manje' : 'Prikaži više'}
                </button>
              </div>
            </div>
          </div>
          <div ref={iconsRef} className={`icons-container ${iconsInView ? 'animate-fade-in-up delay-200' : 'reveal-hidden'}`}>
            <div className="icons-with-description">
              <GroupsIcon style={{ fontSize: 80 }} />
              <span>{t.conference}</span>
            </div>
            <div className="icons-with-description">
              <LocalParkingIcon style={{ fontSize: 80 }} />
              <span>{t.parking}</span>
            </div>
            <div className="icons-with-description">
              <WifiIcon style={{ fontSize: 80 }} />
              <span>{t.wifi}</span>
            </div>
          </div>
        </div>

        <div ref={accomodationRef} className={`w-full bg-zinc-950 py-32 flex flex-col items-center border-y border-zinc-800/50 ${accomodationInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
          <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
            <div className="home-page-large-text !text-white !mb-0 !text-5xl md:!text-6xl tracking-tight" id="home-page-large-text-font">
              {t.accomodation}
            </div>
            <Link
              href="/reservation"
              className="border border-white text-white hover:bg-white hover:text-black transition-all duration-500 py-4 px-10 uppercase tracking-[0.3em] text-xs font-bold"
            >
              {t.reservationTop}
            </Link>
          </div>
          <div className="w-full">
            <RoomsCarousel />
          </div>
        </div>

       
        <div ref={vicinityRef} className={`vicinity-section ${vicinityInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
          <div className="vicinity-background"></div>
          <h2 className="vicinity-title">{t.okolinaTitle}</h2>
          <h2 className="vicinity-description">{t.okolinaDescription}</h2>
          <div className="vicinity-photos-container">
            <div className="vicinity-photo-card">
              <div className="vicinity-photo">
                <img src="/images/Sin-kom/surroundings/zavojsko-jezero-home.jpg" alt="ZavojskoJezeroHome" />
              </div>
              <h3 className="vicinity-photo-title">{t.zavojskoJezero}</h3>
              <p className="vicinity-photo-description">{t.zavojskoDescription}</p>
              <Link href="/surroundings" className="vicinity-learn-more">{t.learnMore}</Link>
            </div>
            <div className="vicinity-photo-card">
              <div className="vicinity-photo">
                <img src="/images/Sin-kom/surroundings/stara-planina-home.jpg" alt="StaraPlaninaHome" />
              </div>
              <h3 className="vicinity-photo-title">{t.staraPlaninaTitle}</h3>
              <p className="vicinity-photo-description">{t.staraPlaninaDescription}</p>
              <Link href="/surroundings" className="vicinity-learn-more">{t.learnMore}</Link>
            </div>
            <div className="vicinity-photo-card">
              <div className="vicinity-photo">
                <img src="/images/Sin-kom/surroundings/vodopadi-home.jpg" alt="VodopadiHome" />
              </div>
              <h3 className="vicinity-photo-title">{t.vodopadiTitle}</h3>
              <p className="vicinity-photo-description">{t.vodopadiDescription}</p>
              <Link href="/surroundings" className="vicinity-learn-more">{t.learnMore}</Link>
            </div>
          </div>
        </div>

        <div ref={markRef} className={`mark-container ${markInView ? 'animate-fade-in-up' : 'reveal-hidden'}`}>
          <div className="booking-reviews-container">
          <div className="booking-reviews-content">
<div className="text-[#fcd949] font-bold text-2xl uppercase tracking-widest mb-4">{t.markText}</div>

          
            
            <div className="reviews-grid">
              <div className="review-card">
                <div className="review-header">
                  <span className="review-author">{t.reviewTitleFirst}</span>
                  <div className="review-stars">★★★★★</div>
                </div>
                <p className="review-text">{t.reviewDescriptionFirst}</p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="review-author">{t.reviewTitleSecond}</span>
                  <div className="review-stars">★★★★★</div>
                </div>
                <p className="review-text">{t.reviewDescriptionSecond}</p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="review-author">{t.reviewTitleThird}</span>
                  <div className="review-stars">★★★★★</div>
                </div>
                <p className="review-text">{t.reviewDescriptionThird}</p>
              </div>
            </div>

            <Link href="https://www.booking.com/hotel/rs/sin-kom.sr.html?aid=356980&label=gog235jc-10CAsowQFCB3Npbi1rb21IJFgDaMEBiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALzz-nPBsACAdICJGYzNjVmMjNhLTJiN2UtNDBkYi1hZTg4LWRmYzE0MDlkOTliM9gCAeACAQ&sid=4e0b706c0addc2b3f30a363a0e1182c4&dest_id=-91926&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1778018309&srpvid=2c459a7a13900192&type=total&ucfs=1&" target="_blank" className="booking-reviews-button">
              {t.readReviews}
            </Link>
          </div>
        </div>

        
        </div>

        
      </main>
    </div>
  );
}
