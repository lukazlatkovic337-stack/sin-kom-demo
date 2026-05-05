"use server";

import { Resend } from "resend";
import { FormData } from "./page";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: FormData) {
  try {
    const { name, email, message } = data;
    console.log("resend : ", resend);
    const { error: resendError } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Replace with your verified domain later if you have one
      to: process.env.CONTACT_EMAIL?.split(",").map((email) =>
        email.trim(),
      ) as string[],
      subject: `New message from ${name}`,
      html: `
        <h2>New message received from contact form</h2>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return { success: false, error: resendError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send email" };
  }
}
