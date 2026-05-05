"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageContext";

export const ROOMS = [
  {
    id: "classic-room",
    images: [
      "/images/Sin-kom/classic-soba/picture1.JPG",
      "/images/Sin-kom/classic-soba/picture2.JPG",
      "/images/Sin-kom/classic-soba/picture3.JPG",
    ],
    nameKey: "clasicRoom",
    descriptionKey: "clasicRoomDescription",
    features: ["twoBeds", "tv", "digiSat", "phoneLine", "wifi", "hairdryer", "ac", "sosAlarm"],
    prices: [
      { labelKey: "priceOnePerson", amount: "3.800 din" },
      { labelKey: "priceTwoPersons", amount: "5.000 din" }
    ]
  },
  {
    id: "standard-room",
    images: [
      "/images/Sin-kom/comfort-soba/slika8.JPG",
      "/images/Sin-kom/comfort-soba/slika9.JPG",
      "/images/Sin-kom/comfort-soba/slika15.JPG",
      "/images/Sin-kom/comfort-soba/slika6.JPG",
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
      { labelKey: "priceOnePerson", amount: "5.000 din" },
      { labelKey: "priceTwoPersons", amount: "6.100 din" },
    ]
  },
  {
    id: "family-room",
    images: [
      "/images/Sin-kom/dvokrevetna-soba/slika4.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika7.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika24.JPG",
      "/images/Sin-kom/dvokrevetna-soba/slika20.JPG",
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
      { labelKey: "priceOnePerson", amount: "4.000 din" },
      { labelKey: "priceTwoPersons", amount: "5.300 din" },
    ]
  },
];
