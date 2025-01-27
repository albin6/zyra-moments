declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_ALLOWED_ORIGIN: string;
      DATABASE_URI: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      PORT: string;
      // Add other environment variables as needed
    }
  }
}
