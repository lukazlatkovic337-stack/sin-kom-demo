"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../Localization/LanguageContext";
import LanguagePicker from "../Localization/LanguagePicker/LanguagePicker";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Toggle Button - Fixed above everything with z-[1001] */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed top-4 right-4 z-[1001] p-3 bg-transparent drop-shadow-md transition-colors ${
          isOpen
            ? "text-zinc-900 dark:text-white"
            : isScrolled
              ? "text-black"
              : "text-white"
        }`}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Sliding Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white dark:bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Navigation */}
        <nav className="flex flex-col gap-6 p-6 pt-20 text-lg font-medium">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.home}
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.gallery}
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.services}
          </Link>

          
          <Link
            href="/reservation"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.reservationTop}
          </Link>
          <Link
            href="/surroundings"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.surroundings}
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-zinc-800 dark:text-zinc-200"
          >
            {t.contact}
          </Link>
        </nav>

        <div className="mt-auto p-6 border-t border-zinc-200 dark:border-zinc-800">
          <LanguagePicker direction="top" />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
