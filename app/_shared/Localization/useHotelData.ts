import { useMemo } from "react";
import { useLanguage } from "./LanguageContext";

export interface RoomData {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface FacilityData {
  images: string[];
}

export interface HotelData {
  rooms: RoomData[];
  reception: FacilityData;
  conference: FacilityData;
}

export const useHotelData = (): HotelData => {
  const { t } = useLanguage();
  return useMemo(
    () => ({
      rooms: [
        {
          id: "clasicRoom-1",
          name: `${t.clasicRoom}`,
          description: `${t.clasicRoomDescription}`,
          price: 3800,
          images: [
            "/images/Sin-kom/classic-soba/picture1.JPG",
            "/images/Sin-kom/classic-soba/picture2.JPG",
          ],
        },
        {
          id: "comfort-room",
          name: `${t.comfortRoom}`,
          description: `${t.comfortRoomDescription}`,
          price: 5000,
          images: Array.from(
            { length: 35 },
            (_, i) => `/images/Sin-kom/comfort-soba/slika${i + 1}.JPG`,
          ),
        },
        {
          id: "doubleRoom-room",
          name: `${t.doubleRoom}`,
          description: `${t.doubleRoomDescription}`,
          price: 4000,
          images: Array.from(
            { length: 32 },
            (_, i) => `/images/Sin-kom/dvokrevetna-soba/slika${i + 1}.JPG`,
          ),
        },
      ],
      reception: {
        images: Array.from(
          { length: 6 },
          (_, i) => `/images/Sin-kom/recepcija/slika${i + 1}.JPG`,
        ),
      },
      conference: {
        images: Array.from(
          { length: 4 },
          (_, i) => `/images/Sin-kom/konferencijska-sala/slika${i + 1}.JPG`,
        ),
      },
    }),
    [t],
  );
};
