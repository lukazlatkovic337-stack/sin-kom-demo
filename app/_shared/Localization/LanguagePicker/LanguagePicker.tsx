"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BulgariaIcon from "../../../../public/icons/bulgaria.svg";
import SerbiaIcon from "../../../../public/icons/serbia.svg";
import UnitedKingdomIcon from "../../../../public/icons/uk.svg";

interface LanguagePickerProps {
  direction?: "bottom" | "top";
}

export default function LanguagePicker({
  direction = "bottom",
}: LanguagePickerProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "en-us", label: "English", icon: UnitedKingdomIcon },
    { value: "latn-rs", label: "Srpski", icon: SerbiaIcon },
    { value: "bg-bg", label: "Български", icon: BulgariaIcon },
  ] as const;

  const selectedOption =
    options.find((o) => o.value === language) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-sm rounded-none px-4 py-2 text-white hover:bg-white/10 focus:outline-none cursor-pointer min-w-[120px] transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          <img
            src={selectedOption.icon?.src || selectedOption.icon}
            alt=""
            className="w-4 h-4 object-cover rounded-sm"
          />
          {selectedOption.label}
        </span>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-none shadow-2xl z-50 overflow-hidden ${direction === "top" ? "bottom-full" : "top-full"}`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLanguage(option.value as any);
                setIsOpen(false);
              }}
              className="w-full flex items-center cursor-pointer gap-2 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors duration-200 text-left border-b border-white/5 last:border-b-0"
            >
              <img
                src={option.icon?.src || option.icon}
                alt=""
                className="w-4 h-4 object-cover rounded-sm"
              />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
