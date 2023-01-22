import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "name is blank").max(100, "name is too long"),
  phone: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().max(30, "phone number is too long").optional()
  ),
  email: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z
      .string()
      .email("email is invalid")
      .max(100, "email is too long")
      .optional()
  ),
  subscribed: z.boolean()
});
