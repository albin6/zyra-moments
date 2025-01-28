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
  INTERNAL_SERVER_ERROR: 500,
};

// Common Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  USER_NOT_FOUND: "User not found.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  SERVER_ERROR: "An error occurred, please try again later.",
  VALIDATION_ERROR: "Validation error occurred.",
  MISSING_PARAMETERS: "Missing required parameters.",
};

// Default Values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  IMAGE_PATH: "/uploads/images",
  USER_ROLE: "user",
};

// JWT Claims
export const JWT_CLAIMS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^\d{10}$/,
};
