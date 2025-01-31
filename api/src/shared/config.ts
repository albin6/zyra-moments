import dotenv from "dotenv";
dotenv.config();

export const config = {
  // CORS Configuration
  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173",
  },

  // Server Configuration
  server: {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
  },

  nodemailer: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },

  // Database Configuration
  database: {
    URI: process.env.DATABASE_URI || "mongodb://localhost:27017/zyra-moments",
    USER: process.env.DATABASE_USER || "admin",
    PASSWORD: process.env.DATABASE_PASSWORD || "password",
  },

  // JWT Configuration (if you're using JWT tokens)
  jwt: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "your-secret-key",
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h", // Default expiration time
  },
};
