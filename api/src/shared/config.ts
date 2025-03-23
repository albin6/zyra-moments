import dotenv from "dotenv";
dotenv.config();

export const config = {
  // CORS Configuration
  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173",
  },

  // Server Configuration
  server: {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
  },

  nodemailer: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },

  redis: {
    URI: process.env.REDIS_URI || `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
  },

  // Database Configuration
  database: {
    URI: process.env.DATABASE_URI || "mongodb://localhost:27017/zyra-moments",
    USER: process.env.DATABASE_USER || "admin",
    PASSWORD: process.env.DATABASE_PASSWORD || "password",
  },

  stripe: {
    sk: process.env.STRIPE_SK || "",
    sws: process.env.STRIPE_WEBHOOK_SECRET || "",
  },

  jwt: {
    ACCESS_SECRET_KEY: process.env.JWT_ACCESS_KEY || "your-secret-key",
    REFRESH_SECRET_KEY: process.env.JWT_REFRESH_KEY || "your-secret-key",
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "",
    REFRESH_EXPIRES_IN: process.env.JWT_REFRSH_EXPIRES_IN || "",
  },
};
