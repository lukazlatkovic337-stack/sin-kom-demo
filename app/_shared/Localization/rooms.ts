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
      "/images/Sin-kom/comfort-soba/slika1.JPG",
      "/images/Sin-kom/comfort-soba/slika2.JPG",
      "/images/Sin-kom/comfort-soba/slika3.JPG",
      "/images/Sin-kom/comfort-soba/slika4.JPG",
      "/images/Sin-kom/comfort-soba/slika5.JPG",
      "/images/Sin-kom/comfort-soba/slika6.JPG",
      "/images/Sin-kom/comfort-soba/slika7.JPG",
      "/images/Sin-kom/comfort-soba/slika8.JPG",
      "/images/Sin-kom/comfort-soba/slika9.JPG",
      "/images/Sin-kom/comfort-soba/slika10.JPG",
      "/images/Sin-kom/comfort-soba/slika11.JPG",
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
      "/images/Sin-kom/dvokrevetna-soba/slika1.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika2.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika3.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika4.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika5.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika6.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika7.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika8.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika9.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika10.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika11.JPG",
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
