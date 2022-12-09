/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PORT: string;
    readonly DATABASE_URL: string;
    readonly JWT_SECRET: string;
  }
}
