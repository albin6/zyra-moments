import { config } from "../../shared/config";

export const corsOptions = {
  origin: config.cors.ALLOWED_ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type", "stripe-signature"],
  credentials: true,
};
