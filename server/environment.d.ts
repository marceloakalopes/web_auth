declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string!;
      DB_NAME: string!;
      DB_USER: string!;
      DB_PORT: number!;
      NODE_ENV: "development" | "production";
      PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
