"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";
import { useLanguage } from "../_shared/Localization/LanguageContext";
import LanguagePicker from "../_shared/Localization/LanguagePicker/LanguagePicker";
import Logo from "../../public/images/logo-resized.png";

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        // Hides totally when scrolled past 100vh (the height of SwiperMain)
        setIsScrolled(window.scrollY > window.innerHeight - 50);
      } else {
        // Hides after scrolling a small amount (50px) on other pages
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const linkClass = "text-white hover:text-[#EBD27D] relative py-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#EBD27D] after:transition-all after:duration-300 hover:after:w-full";

  const headerClass = isHome
    ? `header-custom fixed top-0 left-0 w-full z-50 transition-all duration-500 !bg-transparent ${
        isScrolled
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`
    : `header-custom fixed top-0 left-0 w-full z-50 transition-all duration-500 !bg-[#191A19] ${
        isScrolled
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`;

  return (
    <>
      <header className={headerClass}>
        <div className="pl-[10px] pt-[10px]">
          <Link href="/">
            <img src={Logo.src} className="header-logo-img" />
          </Link>
        </div>

        <div className="header-right">
          <nav className="hidden md:flex gap-6 uppercase">
            <Link
              href="/"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.home}
            </Link>
            <Link
              href="/gallery"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.gallery}
            </Link>
            <Link
              href="/services"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.services}
            </Link>

           

            <Link
              href="/reservation"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.reservationTop}
            </Link>
            <Link
              href="/surroundings"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.surroundings}
            </Link>

             <Link
              href="/contact"
              className={`${linkClass} font-medium transition-colors`}
            >
              {t.contact}
            </Link>
          </nav>

         <a
            href="tel:+381638513631"
            className="hidden xl:flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold rounded-none px-4 py-2 text-white hover:bg-[#EBD27D] hover:text-black hover:border-[#EBD27D] transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            +381 63 851 3631
          </a>

          <div className="hidden md:block">
            <LanguagePicker />
          </div>
        </div>
      </header>
      {!isHome && <div className="h-[160px] w-full" />}
    </>
  );
};

export default Header;