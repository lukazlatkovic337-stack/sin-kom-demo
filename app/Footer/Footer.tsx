"use client";

import { useLanguage } from "../_shared/Localization/LanguageContext";
import "./style.css";
import Logo from "../../public/images/logo-resized.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer-custom !flex-col text-white py-12 w-full">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 mb-10 text-center md:text-left">
        {/* Column 1: About */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            <img src={Logo.src} className="h-[150px]" />
          </h3>
        </div>

        {/* Column 2: Contact */}
        <div className="flex flex-col gap-4 items-center justify-center  w-[100%]">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            {t.contact}
          </h3>
          <div className="text-zinc-400 text-sm leading-relaxed  w-[100%] flex flex-col justify-center items-center">
            <div className="flex flex-row gap-2 items-center justify-center">
              <LocalPhoneIcon style={{ fontSize: 20 }} />
              <a
                href="tel:+381638513631"
                className="hover:text-white transition-colors"
              >
                +381 63 851 36 31
              </a>
            </div>
            <div className="pl-[20px]">
              <a
                href="tel:+38110322505"
                className="hover:text-white transition-colors"
              >
                +381 10 322 505
              </a>
            </div>
            <br />
            <div className="flex flex-row gap-2 items-center justify-center">
              <EmailIcon />
              <a
                href="mailto:hotelsinkom@gmail.com"
                className="hover:text-white transition-colors"
              >
                hotelsinkom@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="w-full max-w-[300px] h-[150px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=Sin-Kom+Hotel+Garni,+Pirot&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Sin-Kom Location"
            ></iframe>
          </div>
          <div className="text-zinc-400 text-sm leading-relaxed  w-[100%] flex flex-col justify-center items-center">
            Nikole Pašića bb 18300 Pirot, Srbija
          </div>
        </div>
      </div>

      <div className="w-full border-t border-zinc-800 pt-6 flex flex-col justify-center items-center gap-2 text-sm text-zinc-400">
        <p>
          &copy; {currentYear} {t.hotelName}. {t.rights}
        </p>
        <p>Powered by L.Z design</p>
      </div>
    </footer>
  );
};
export default Footer;
