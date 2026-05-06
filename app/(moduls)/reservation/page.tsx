"use client";

import { useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLanguage } from "@/app/_shared/Localization/LanguageContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/Add";
import "../../style.css";
import { useHotelData } from "@/app/_shared/Localization/useHotelData";
import { sendReservationEmail } from "./actions";
import { registerLocale } from "react-datepicker";
import { srLatn, bg, enUS } from "date-fns/locale";

// Registracija lokala za ispravan prikaz imena meseci
registerLocale("latn-rs", srLatn);
registerLocale("bg-bg", bg);
registerLocale("en-us", enUS);

interface RoomSelection {
  id: string;
  roomId: string;
  persons: "1" | "2";
  extraBed: boolean;
  nonSmoking: boolean;
  dateRange: [Date | null, Date | null];
}

export default function Reservation() {
  // Pretpostavljamo da useLanguage vraća i trenutni kod jezika
  const { t, language } = useLanguage() as any; 
  const { rooms: hotelRooms } = useHotelData();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<RoomSelection[]>([
    {
      id: Date.now().toString(),
      roomId: hotelRooms[0]?.id || "",
      persons: "1",
      extraBed: false,
      nonSmoking: false,
      dateRange: [null, null],
    },
  ]);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        roomId: hotelRooms[0]?.id || "",
        persons: "1",
        extraBed: false,
        nonSmoking: false,
        dateRange: [null, null],
      },
    ]);
  };

  const handleRemoveRoom = (idToRemove: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== idToRemove));
  };

  const handleRoomChange = (
    id: string,
    field: keyof RoomSelection,
    value: any,
  ) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const calculateRoomPrice = (room: RoomSelection) => {
    const roomData = hotelRooms.find((r) => r.id === room.roomId);
    if (!roomData) return 0;

    let basePrice = 0;
    if (room.roomId === "clasicRoom-1") {
      basePrice = room.persons === "1" ? 3800 : 5000;
    } else if (room.roomId === "comfort-room") {
      basePrice = room.persons === "1" ? 5000 : 6100;
    } else if (room.roomId === "doubleRoom-room") {
      basePrice = room.persons === "1" ? 4000 : 5300;
    } else {
      basePrice = roomData.price;
    }

    if (room.extraBed) basePrice += 1900;

    let days = 1;
    if (room.dateRange[0] && room.dateRange[1]) {
      const diffTime = Math.abs(
        room.dateRange[1].getTime() - room.dateRange[0].getTime(),
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = diffDays === 0 ? 1 : diffDays;
    }

    return basePrice * days;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      userInfo,
      rooms: rooms.map((room) => {
        const roomData = hotelRooms.find((r) => r.id === room.roomId);
        return {
          roomName: roomData?.name || "Unknown Room",
          persons: room.persons,
          extraBed: room.extraBed,
          nonSmoking: room.nonSmoking,
          startDate: room.dateRange[0]?.toLocaleDateString() || "Not specified",
          endDate: room.dateRange[1]?.toLocaleDateString() || "Not specified",
          price: calculateRoomPrice(room),
        };
      }),
    };

    const result = await sendReservationEmail(payload);
    setIsSubmitting(false);

    if (result.success) {
      alert("Zahtev uspesno kreiran!");
      setUserInfo({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-zinc-950 text-white font-sans pt-10 pb-10">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-start pt-10 pb-20 px-4 md:px-16 bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl sm:items-start">
        <div className="flex flex-col items-center sm:items-start gap-4 mb-12 w-full">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:justify-between w-full">
            <h1 className="reservationTitle text-4xl md:text-6xl font-normal text-white text-center tracking-normal">
              {t.reservationTop}
            </h1>
            <a 
              href="/docs/104-CENOVNIK-13012025.pdf" 
              target="_blank" 
              className="mb-2 px-6 py-2 border border-[#fcd949] text-[#fcd949] hover:bg-[#fcd949] hover:text-black transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
            >
              {t.pricingList}
            </a>
          </div>
          <div className="w-24 h-1 bg-[#fcd949]"></div>
        </div>

        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Dynamic Rooms Selection */}
          <div className="flex flex-col gap-6">
            {rooms.map((room, index) => (
              <div 
                key={room.id}
                className="p-6 bg-zinc-900/60 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:border-[#fcd949]/50 transition-all duration-500 shadow-2xl flex flex-col gap-6 relative"
              >
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(room.id)}
                    className="absolute top-4 right-4 text-white/60 hover:text-red-500 transition-colors duration-300"
                    title={t.removeRoom}
                  >
                    <RemoveCircleOutlineIcon />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                      {t.serviceType}
                    </label>
                    <input
                      type="text"
                      disabled
                      value={t.bedAndBreakfast}
                      className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white/70 placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 cursor-not-allowed appearance-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                      {t.roomType}
                    </label>
                    <select
                      value={room.roomId}
                      onChange={(e) =>
                        handleRoomChange(room.id, "roomId", e.target.value)
                      }
                      className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none appearance-none"
                    >
                      {hotelRooms.map((r) => (
                        <option key={r.id} value={r.id} className="bg-zinc-900 text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                      {t.numberOfPersons}
                    </label>
                    <select
                      value={room.persons}
                      onChange={(e) =>
                        handleRoomChange(room.id, "persons", e.target.value)
                      }
                      className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none appearance-none"
                    >
                      <option value="1" className="bg-zinc-900 text-white">
                        {t.onePerson}
                      </option>
                      <option value="2" className="bg-zinc-900 text-white">
                        {t.twoPersons}
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                      {t.selectPeriod}
                    </label>
                    <DatePicker
                      locale={language} // Postavlja jezik kalendara (npr. 'latn-rs')
                      dateFormat="dd-MMMM-yyyy" // Format: 13-januar-2025
                      selectsRange={true}
                      startDate={room.dateRange[0] || undefined}
                      endDate={room.dateRange[1] || undefined}
                      onChange={(update) =>
                        handleRoomChange(room.id, "dateRange", update)
                      }
                      isClearable={true}
                      placeholderText={t.selectPeriodPlaceholder || "Od - Do"}
                      className="w-full p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-2 border-t border-white/10 pt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-semibold uppercase tracking-wider">{t.options}</label>
                    <div className="flex flex-col gap-2 text-sm text-white">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={room.extraBed}
                          onChange={(e) =>
                            handleRoomChange(
                              room.id,
                              "extraBed",
                              e.target.checked,
                            )
                          }
                          className="w-5 h-5 cursor-pointer accent-[#fcd949]"
                        />
                        {t.extraBed}
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={room.nonSmoking}
                          onChange={(e) =>
                            handleRoomChange(
                              room.id,
                              "nonSmoking",
                              e.target.checked,
                            )
                          }
                          className="w-5 h-5 cursor-pointer accent-[#fcd949]"
                        />
                        {t.nonSmokingRoom}
                      </label>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-white/60 text-sm uppercase tracking-wider">
                      {t.roomPrice}:
                    </span>
                    <div className="text-2xl font-bold text-[#fcd949]">
                      {calculateRoomPrice(room)} RSD
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddRoom}
              className="flex items-center gap-2 text-[#fcd949] font-bold uppercase tracking-widest hover:text-white transition-colors duration-300 w-fit"
            >
              <AddCircleOutlineIcon />
              {t.addAnotherRoom}
            </button>
          </div>

          {/* Personal Information */}
          <div className="p-6 bg-zinc-900/60 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:border-[#fcd949]/50 transition-all duration-500 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#fcd949] uppercase tracking-widest mb-6">{t.personalData}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="fullName"
                placeholder={t.fullName}
                value={userInfo.fullName}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
              <input
                required
                type="tel"
                name="phone"
                placeholder={t.mobilePhone}
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
              <input
                required
                type="email"
                name="email"
                placeholder={t.emailAddress}
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
              <input
                required
                type="text"
                name="address"
                placeholder={t.address}
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
              <input
                required
                type="text"
                name="city"
                placeholder={t.city}
                value={userInfo.city}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
              <input
                required
                type="text"
                name="country"
                placeholder={t.country}
                value={userInfo.country}
                onChange={handleUserInfoChange}
                className="p-3 border rounded-lg bg-zinc-800 border-white/20 text-white placeholder-white/50 focus:border-[#fcd949] focus:ring-1 focus:ring-[#fcd949] transition-colors duration-200 outline-none w-full"
              />
            </div>
          </div>

          <p className="text-sm text-white/70 italic text-justify">
            * {t.reservationNotice}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#fcd949] text-black font-bold uppercase tracking-widest px-12 py-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed self-center md:self-end mt-4"
          >
            {isSubmitting ? "Sending..." : t.sendRequest}
          </button>
        </form>
      </main>
    </div>
  );
}
