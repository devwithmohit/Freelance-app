import { resend } from "@/lib/resend";

import VerificationEmail from "../../email/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["mailtomohit2005@gmail.com"],
      subject: "Hello world, you are verified ,from Next js",
      react: VerificationEmail({ username: "John", otp: verifyCode }),
    });
    return { success: true, message: " Send Verification Email Successfully" };
  } catch (error) {
    console.error("Email Verification Error", error);
    return { success: false, message: " Failed to send verification email" };
  }
}
