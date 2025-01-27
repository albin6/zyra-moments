// src/shared/config.ts

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  // CORS Configuration
  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173",
  },

  // Server Configuration
  server: {
    PORT: process.env.PORT || 5000, // Default to 5000 if not set
    NODE_ENV: process.env.NODE_ENV || "development", // Default to 'development' if not set
    BASE_URL: process.env.BASE_URL || "http://localhost:5000", // Base URL for the API
  },

  // Database Configuration
  database: {
    URI: process.env.DATABASE_URI || "mongodb://localhost:27017/mydb", // Replace with actual URI or use fallback
    USER: process.env.DATABASE_USER || "admin",
    PASSWORD: process.env.DATABASE_PASSWORD || "password",
  },

  // JWT Configuration (if you're using JWT tokens)
  jwt: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "your-secret-key",
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h", // Default expiration time
  },

  // Other configurations (e.g., Logging, API Keys, etc.)
  logging: {
    LEVEL: process.env.LOGGING_LEVEL || "info", // Default to 'info'
  },

  // External Service APIs (e.g., for email, payment gateway, etc.)
  externalAPIs: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || "",
    PAYMENT_GATEWAY_API_KEY: process.env.PAYMENT_GATEWAY_API_KEY || "",
  },
};
