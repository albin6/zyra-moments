import * as Yup from "yup";

export const clientProfileSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name should only contain letters")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name should only contain letters")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  profileImage: Yup.string(),
});

export const passwordResetSchema = Yup.object({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password") as unknown as string], "Passwords must match")
    .required("Confirm Password is required"),
  currentPassword: Yup.string().required("Current password is required"),
});
