declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URI: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODEMAILER_EMAIL: string;
      NODEMAILER_PW: string;
      AUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      RAZORPAY_ID: string;
      RAZORPAY_KEY: string;
      SHIPROCKET_EMAIL: string;
      SHIPROCKET_PASSWORD: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
