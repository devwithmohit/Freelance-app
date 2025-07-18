import { z } from "zod";

export const messageSchema = z.object({
  messageSchema: z
    .string()
    .min(10, { message: "content must be at least of 10 Chararcter" })
    .max(300, { message: "Content must be no longer than 300 character " }),
});
