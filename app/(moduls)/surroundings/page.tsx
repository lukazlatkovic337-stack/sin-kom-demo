"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../_shared/Localization/LanguageContext";
import "../../style.css";

export default function Surroundings() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Okolina Pirota - Hotel Sin-Kom";
  }, []);

  const locations = [
    {
      title: t.staraPlaninaTitle || "Stara Planina",
      description: t.staraPlaninaDescription || "Stara planina je riznica biodiverziteta i dom najviših vrhova u Srbiji. Istražite Midžor, Babin zub i beskrajne pašnjake koji oduzimaju dah u svako godišnje doba.",
      image: "/images/Sin-kom/surroundings/stara-planina-home.jpg",
      gallery: [
        { src: "/images/Sin-kom/stara-planina/babin-zub.jpg", name: "Babin Zub", description: "Babin zub je jedan od vrhova planinskog masiva, Stara planina.  Nalazi se na 1785 m/nv, odakle počinje uspon na Midžor. Zapadna strana je karakteristična po vertikalnim odsecima stena." },
        { src: "/images/Sin-kom/stara-planina/midzor-vrh.jpg", name: "Vrh Midžor", description: "Najviša tačka centralne Srbije (2169m)." },
        { src: "/images/Sin-kom/stara-planina/stara-planina-skijanje.jpg", name: "Ski centar Stara Planina", description: "Ski centar na Staroj Planini je pravo mesto za sve ljubitelje skijanja i zimskog uživanja." },
        { src: "/images/Sin-kom/stara-planina/jelovicko-vrelo.jpg", name: "Jelovičko vrelo", description: "Jelovičko vrelo je prirodno vrelo koje se nalazi u blizini Stare planine." },
        { src: "/images/Sin-kom/stara-planina/rosomacki-lonci.jpg", name: "Rosomački lonci", description: "Rosomački lonci ili slavinjsko grlo predstavlja klisuru rečne doline Rosomačke reke. Nalazi se u blizini  sela Slavinja koje je od Pirota udaljeno 30 km.Do kanjona se dolazi  iz centra sela, za oko 15 minuta laganog hoda. Staza je obeležena i prolazi kroz jedinstveni reljef ovog dela Stare planine." },
        
      ]
    },
    {
      title: t.vodopadiTitle || "Vodopadi",
      description: t.vodopadiDescription || "Pirotski kraj je poznat kao zemlja vodopada. Od bajkovite Tupavice do moćnog Bigra, ovi prirodni dragulji pružaju osveženje i neverovatne prizore skrivene u dubini šuma.",
      image: "/images/Sin-kom/surroundings/vodopadi-home.jpg",
      gallery: [
        { src: "/images/Sin-kom/vodopadi/vodopad-tupavica.jpg", name: "Vodopad Tupavica", description: "Vodopad Tupavica – najlepši vodopad Srbije." },
        { src: "/images/Sin-kom/vodopadi/vodopad-piljski.jpg", name: "Piljski vodopad", description: "Visine 64 metаrа, treći je po visini vodopаd u Srbiji. Nаlаzi se nа oko 4km južno od selа Topli Do, nа Stаroj plаnini." },
        { src: "/images/Sin-kom/vodopadi/vodopad-cunguljski-skok.jpg", name: "Čunguljski skok", description: "Nаlаzi se nа Toplodolskoj reci, u blizini selа Topli Do, nа Stаroj plаnini. Vodopad je visine 43 metara,smešten na nadmorskoj visini od 1400 metara." },
        { src: "/images/Sin-kom/vodopadi/vodopad-kurtulski.jpg", name: "Kurtulski vodopad", description: "Visinа Kurtulskog skokа iznosi 27 metаrа. Obilazak vodopada isključivo u pratnji planinarskog vodiča." },
        { src: "/images/Sin-kom/vodopadi/vodopad-kaludjerski-skok.jpg", name: "Kaluđerski skok", description: "Vodopad se nalazi na Kaluđerskoj reci, ispod Midžora, najvišeg vrha Stare planine." },
        
      ]
    },
    {
      title: t.zavojskoJezero || "Zavojsko jezero",
      description: t.zavojskoDescription || "Smešteno u srcu Stare planine, Zavojsko jezero je raj za ribolovce, kupače i ljubitelje prirode. Njegova smaragdna voda i strmi obronci čine ga jednim od najlepših veštačkih jezera u regionu.",
      image: "/images/Sin-kom/surroundings/zavojsko-jezero-home.jpg",
      gallery: [
        { src: "/images/Sin-kom/zavojsko-jezero/kozji-kamen.jpg", name: "Vidikovac Kozji Kamen", description: "Vidikovac Kozji Kamen pruža spektakularan pogled na Zavojsko jezero i okolne planine." },
        { src: "/images/Sin-kom/zavojsko-jezero/vidikovac-smilovica.jpg", name: "Vidikovac Smilovica", description: "Vidikovac Smilovica – pogled na Zavojsko jezero koji ostavlja bez daha!" },
        { src: "/images/Sin-kom/zavojsko-jezero/selo-gostusa.jpg", name: "Selo Gostuša", description: "U podnožju Stare planine, ispod prostrane visoravni “Belan”, u blizini Zavojskog jezera, udaljeno 25 kilometara severoistočno od Pirota nalazi se selo Gostuša." },
        
      ]
    },
    {
      title: t.zanimljivostiTitle || "Zanimljivosti u gradu",
      description: t.zanimljivostiDescription || "Pirot nudi bogat kulturni sadržaj. Posetite srednjovekovnu tvrđavu Momčilov grad, istražite Muzej Ponišavlja sa autentičnom arhitekturom ili prošetajte najlepšim kejom u Srbiji pored reke Nišave.",
      image: "/images/Sin-kom/zanimljivosti-u-gradu/kej-naslovna.jpg",
      gallery: [
        { src: "/images/Sin-kom/zanimljivosti-u-gradu/tvrdjava-pirot.jpg", name: t.kaleName || "Tvrđava Kale", description: t.kaleDesc || "Srednjovekovni grad, ponos pirotske istorije." },
        { src: "/images/Sin-kom/zanimljivosti-u-gradu/muzej-pirot.JPG", name: t.muzejName || "Muzej Ponišavlja", description: t.muzejDesc || "Autentična arhitektura i bogata riznica." },
        { src: "/images/Sin-kom/zanimljivosti-u-gradu/pirotski-kej.jpeg", name: t.kejName || "Pirotski Kej", description: t.kejDesc || "Najlepše šetalište pored reke Nišave." },
      ]
    },
    {
      title: t.jermaTitle || "Kanjon reke Jerme",
      description: t.jermaDescription || "Kanjon reke Jerme je skriveni dragulj prirode, poznat po svojim strmim liticama, kristalno čistoj vodi i netaknutoj divljini. Idealno mesto za avanturiste i ljubitelje prirode koji traže mir i spektakularne pejzaže.",
      image: "/images/Sin-kom/jerma/kanjon-jerme.jpg",
      gallery: [
        { src: "/images/Sin-kom/jerma/manastir-poganovo.jpg", name: t.poganovoName || "Manastir Poganovo", description: t.poganovoDesc || "" },
        { src: "/images/Sin-kom/jerma/manastir-sukovo.JPG", name: t.sukovoName || "Manastir Sukovo", description: t.sukovoDesc || "" },
        { src: "/images/Sin-kom/jerma/banja-zvonce.jpg", name: t.zvonackaBanjaName || "Zvonačka banja", description: t.zvonackaBanjaDesc || "" },
      ]
    }
  ];

  const currentLoc = selectedLocation !== null ? locations[selectedLocation] : null;

  const handleBack = () => {
    setSelectedLocation(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 md:px-10 relative overflow-x-hidden">
      {/* Modern Back Button */}
      {selectedLocation !== null && (
        <button
          onClick={handleBack}
          className="fixed top-48 left-4 md:left-16 z-50 flex items-center gap-3 text-white/70 hover:text-[#fcd949] transition-all duration-300 group"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#fcd949] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <span className="text-xs uppercase font-bold tracking-widest">
            Nazad na listu
          </span>
        </button>
      )}

      <main className="max-w-7xl mx-auto flex flex-col items-center">
        {!currentLoc ? (
          <>
            <h1 className="okolinaTitle text-6xl md:text-8xl text-white text-center mb-6">
              {t.okolinaTitle || "Okolina"}
            </h1>
            <p className="text-white/60 text-center max-w-2xl mb-16 uppercase tracking-[0.2em] text-sm md:text-base">
              {t.okolinaDescription || "Istražite lepote pirotskog kraja"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-fade-in-up">
              {locations.map((loc, index) => (
                <button
                  onClick={() => {
                    setSelectedLocation(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  key={index}
                  className="group relative block w-full aspect-[16/10] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-[#fcd949] rounded-none cursor-pointer"
                >
                  <img
                    src={loc.image}
                    alt={loc.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#fcd949] transition-colors uppercase tracking-widest text-left">
                      {loc.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base max-w-md line-clamp-2 italic text-left">
                      {loc.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full animate-fade-in-up flex flex-col items-center">
            <h1 className="okolinaTitle text-6xl md:text-8xl text-white text-center mb-10">
              {currentLoc.title}
            </h1>
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentLoc.gallery.map((item, i) => (
                <div key={i} className="flex flex-col gap-4 group bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-xl transition-all hover:border-[#fcd949]">
                  <div className="aspect-[3/4] overflow-hidden border border-white/10 bg-black/40">
                    <img 
                      src={item.src} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[#fcd949] text-lg font-bold uppercase tracking-widest">
                      {item.name}
                    </h4>
                    <p className="text-white/80 text-sm italic leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
