import { z } from "zod";
export const Uservalidation = z
  .string()
  .min(2, "Username must be atleast 2 letter")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not conatin Special character");

export const signUpSchema = z.object({
  username: Uservalidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 character" }),
});
