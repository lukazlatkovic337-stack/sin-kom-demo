"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactEmail } from "./actions";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./style.css";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const { t } = useLanguage();
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  async function onSubmit(data: FormData) {
    setStatus(null);
    const result = await sendContactEmail(data);

    if (result.success) {
      setStatus({ type: 'success', msg: t.successMessage });
      reset(); // Clears the form fields
    } else {
      setStatus({ type: 'error', msg: t.errorMessage });
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Contact Info */}
          <div className="lg:w-1/2 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="contact-heading text-5xl md:text-7xl tracking-tighter">
                {t.contact}
              </h1>
              <p className="text-zinc-600 text-lg italic max-w-md leading-relaxed">
                {t.contactPageSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 border border-zinc-200 group-hover:border-[#7c6648] transition-all text-[#7c6648]">
                  <LocationOnIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#464545] font-bold uppercase tracking-widest text-xs mb-1">{t.address}</span>
                  <span className="text-zinc-700 italic text-sm">Srpskih Vladara bb, Pirot, Srbija</span>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 border border-zinc-200 group-hover:border-[#7c6648] transition-all text-[#7c6648]">
                  <PhoneIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#464545] font-bold uppercase tracking-widest text-xs mb-1">{t.reception}</span>
                  <div className="flex flex-col text-zinc-700 italic text-sm">
                    <a href="tel:+381638513631" className="hover:underline">+381 63 851 36 31</a>
                    <a href="tel:+38110322505" className="hover:underline">+381 10 322 505</a>
                    <a href="tel:+38110327045" className="hover:underline">+381 10 327 045</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 border border-zinc-200 group-hover:border-[#7c6648] transition-all text-[#7c6648]">
                  <MailOutlineIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#464545] font-bold uppercase tracking-widest text-xs mb-1">{t.emailAddress}</span>
                  <a href="mailto:hotelsinkom@gmail.com" className="text-zinc-700 italic text-sm hover:underline">
                    hotelsinkom@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 border border-zinc-200 group-hover:border-[#7c6648] transition-all text-[#7c6648]">
                  <AccessTimeIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#464545] font-bold uppercase tracking-widest text-xs mb-1">24/7</span>
                  <span className="text-zinc-700 italic text-sm">{t.reception}</span>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder or Embed */}
            <div className="w-full h-64 bg-zinc-100 border border-zinc-200 rounded-sm overflow-hidden  contrast-125 opacity-70 hover:opacity-100 transition-opacity">
              <iframe 
                src="https://maps.google.com/maps?q=Sin-Kom+Hotel+Garni,+Pirot&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
          
          {/* Right Side: Form */}
          <div className="lg:w-1/2">
            <form className="contact-form-modern" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#EACF78]">{t.fullName}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Unesite vaše ime i prezime"
                    {...register("name", { required: true })}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#EACF78]">{t.emailAddress}</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#EACF78]">{t.messageLabel}</label>
                  <textarea
                    rows={6}
                    className="form-input resize-none"
                    placeholder={t.messagePlaceholder}
                    {...register("message", { required: true })}
                  ></textarea>
                </div>

                {status && (
                  <div className={`p-4 text-sm italic ${status.type === 'success' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {status.msg}
                  </div>
                )}

                <button 
                  disabled={isSubmitting} 
                  className="custom-button-reserve w-full py-4 text-center mt-4"
                >
                  {isSubmitting ? "..." : t.contactButton}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
