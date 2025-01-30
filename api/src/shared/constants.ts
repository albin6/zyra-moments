export const ROLES = {
  ADMIN: "admin",
  USER: "client",
  VENDOR: "vendor",
} as const;

export type TRole = "client" | "admin" | "vendor";

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful.",
  REGISTRATION_SUCCESS: "Registration completed successfully.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  UPDATE_SUCCESS: "Updated successfully.",
  DELETE_SUCCESS: "Deleted successfully.",
  OPERATION_SUCCESS: "Operation completed successfully.",
  PASSWORD_RESET_SUCCESS: "Password reset successfully.",
  VERIFICATION_SUCCESS: "Verification completed successfully.",
  DATA_RETRIEVED: "Data retrieved successfully.",
  ACTION_SUCCESS: "Action performed successfully.",
};

export const ERROR_MESSAGES = {
  EMAIL_EXISTS: "Email Already Exists",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  USER_NOT_FOUND: "User not found.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  SERVER_ERROR: "An error occurred, please try again later.",
  VALIDATION_ERROR: "Validation error occurred.",
  MISSING_PARAMETERS: "Missing required parameters.",
};

export const DEFAULTS = {
  PAGE_SIZE: 10,
  IMAGE_PATH: "/uploads/images",
  USER_ROLE: "user",
};

export const JWT_CLAIMS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^\d{10}$/,
};
