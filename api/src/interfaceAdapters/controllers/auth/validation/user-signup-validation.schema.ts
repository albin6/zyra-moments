import { z } from "zod";

import { strongEmailRegex } from "../../../../shared/validations/email.validation";
import { passwordSchema } from "../../../../shared/validations/password.validation";
import { nameSchema } from "../../../../shared/validations/name.validation";
import { phoneNumberSchema } from "../../../../shared/validations/phone.validation";

const adminSchema = z.object({
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format" }),
  password: passwordSchema,
  role: z.literal("admin"),
});

const clientSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format" }),
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.literal("client"),
});

const vendorSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format" }),
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.literal("vendor"),
});

export const userSchemas = {
  admin: adminSchema,
  client: clientSchema,
  vendor: vendorSchema,
};
