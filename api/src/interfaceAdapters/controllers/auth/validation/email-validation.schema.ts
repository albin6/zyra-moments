import { z } from "zod";
import { strongEmailRegex } from "../../../../shared/validations/email.validation";

export const emailVerifySchema = z.object({
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format" }),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});
