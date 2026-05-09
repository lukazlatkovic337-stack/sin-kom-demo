"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageContext";

export const ROOMS = [
  {
    id: "classic-room",
    images: [
      "/images/Sin-kom/classic-soba/picture1.JPG",
      "/images/Sin-kom/classic-soba/picture2.JPG",
    ],
    nameKey: "clasicRoom",
    descriptionKey: "clasicRoomDescription",
    features: ["twoBeds", "tv", "digiSat", "phoneLine", "wifi", "hairdryer", "ac", "sosAlarm"],
    prices: [
      { labelKey: "priceOnePerson", amount: "OD 3.800 RSD" },
    ]
  },
  {
    id: "standard-room",
    images: [
      "/images/Sin-kom/comfort-soba/slika1.jpg",
      "/images/Sin-kom/comfort-soba/slika2.jpg",
      "/images/Sin-kom/comfort-soba/slika3.jpg",
      "/images/Sin-kom/comfort-soba/slika4.jpg",
      "/images/Sin-kom/comfort-soba/slika5.jpg",
      "/images/Sin-kom/comfort-soba/slika6.jpg",
      "/images/Sin-kom/comfort-soba/slika7.jpg",
      "/images/Sin-kom/comfort-soba/slika8.jpg",
      "/images/Sin-kom/comfort-soba/slika9.jpg",
      "/images/Sin-kom/comfort-soba/slika10.jpg",
      "/images/Sin-kom/comfort-soba/slika11.jpg",
    ],
    nameKey: "comfortRoom",
    descriptionKey: "comfortRoomDescription",
    features: [
      "doubleBed",
      "hydromassage",
      "hairdryer",
      "miniBar",
      "tv",
      "digiSat",
      "phoneLine",
      "wifi",
      "airConditioned",
      "sosAlarm",
      "safe",
    ],
    prices: [
      { labelKey: "priceOnePerson", amount: "OD 5.000 RSD" },
    ]
  },
  {
    id: "family-room",
    images: [
      "/images/Sin-kom/dvokrevetna-soba/slika1.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika2.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika3.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika4.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika5.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika6.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika7.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika8.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika9.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika10.jpg",
      "/images/Sin-kom/dvokrevetna-soba/slika11.jpg",
    ],
    nameKey: "doubleRoom",
    descriptionKey: "doubleRoomDescription",
    features: [
      "doubleBed",
      "hairdryer",
      "miniBarNote",
      "tv",
      "digiSat",
      "phoneLine",
      "wirelessInternet",
      "airConditioned",
      "sosAlarm",
    ],
    prices: [
      { labelKey: "priceOnePerson", amount: "OD 4.000 RSD" },
    ]
  },
];
