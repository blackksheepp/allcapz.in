declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URI: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      AUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      RAZORPAY_ID: string;
      RAZORPAY_KEY: string;
      SHIPROCKET_EMAIL: string;
      SHIPROCKET_PASSWORD: string;
      ADMIN_PASSWORD: string;
      TELEGRAM_BOT_TOKEN: string;
      TELEGRAM_CHANNEL: string;
      AWS_REGION: string;
      AWS_S3_BUCKET: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      SMTP_HOST: string
      SMTP_PORT: string
      SMTP_USERNAME: string
      SMTP_PASSWORD: string
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
