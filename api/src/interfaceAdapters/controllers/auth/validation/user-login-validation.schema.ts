import { z } from "zod";
import { strongEmailRegex } from "../../../../shared/validations/email.validation";
import { passwordSchema } from "../../../../shared/validations/password.validation";

export const loginSchema = z.object({
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format" }),
  password: passwordSchema,
  role: z.enum(["admin", "client", "vendor"]),
});
