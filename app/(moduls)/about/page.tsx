"use client";

import { useHotelData } from "@/app/_shared/Localization/useHotelData";
import { useEffect } from "react";
import Image from "next/image";

export default function AboutUs() {
  const { rooms, conference, reception } = useHotelData();

  useEffect(() => {
      document.title = "Galerija - Hotel Sin-Kom Pirot";
    }, []);

  return (
    <div>
      {/* Example: Rendering the reception images */}
      <div className="reception-gallery">
        {reception.images.map((src, index) => (
          <img key={index} src={src} alt={`Reception ${index + 1}`} />
        ))}
      </div>

      {/* Example: Rendering the conference images */}
      <div className="conference-gallery">
        {conference.images.map((src, index) => (
          <img key={index} src={src} alt={`Conference Room ${index + 1}`} />
        ))}
      </div>

      {/* Example: Rendering rooms */}
      <div className="rooms-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Price: {room.price} RSD</p>
            <div className="room-images">
              {room.images.map((src, index) => (
                <img key={index} src={src} alt={`${room.name} ${index + 1}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
