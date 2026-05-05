"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ReservationPayload = {
  userInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  rooms: {
    roomName: string;
    persons: string;
    extraBed: boolean;
    nonSmoking: boolean;
    startDate: string;
    endDate: string;
    price: number;
  }[];
};

export async function sendReservationEmail(data: ReservationPayload) {
  try {
    const { userInfo, rooms } = data;

    const roomsHtml = rooms
      .map(
        (room, index) => `
      <h3>Room ${index + 1}: ${room.roomName}</h3>
      <ul>
        <li><strong>Persons:</strong> ${room.persons}</li>
        <li><strong>Dates:</strong> ${room.startDate} to ${room.endDate}</li>
        <li><strong>Extra Bed:</strong> ${room.extraBed ? "Yes" : "No"}</li>
        <li><strong>Non-Smoking:</strong> ${room.nonSmoking ? "Yes" : "No"}</li>
        <li><strong>Calculated Price:</strong> ${room.price} RSD</li>
      </ul>
    `,
      )
      .join("");

    const html = `
      <h2>New Reservation Request</h2>
      <h3>Customer Details:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${userInfo.fullName}</li>
        <li><strong>Email:</strong> ${userInfo.email}</li>
        <li><strong>Phone:</strong> ${userInfo.phone}</li>
        <li><strong>Address:</strong> ${userInfo.address}, ${userInfo.city}, ${userInfo.country}</li>
      </ul>
      <h3>Reservation Details:</h3>
      ${roomsHtml}
    `;

    const { error: resendError } = await resend.emails.send({
      from: "Reservation Form <onboarding@resend.dev>", // Replace with your verified domain later
      to: process.env.CONTACT_EMAIL?.split(",").map((email) =>
        email.trim(),
      ) as string[],
      subject: `New Reservation Request from ${userInfo.fullName}`,
      html,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return { success: false, error: resendError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send reservation email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
