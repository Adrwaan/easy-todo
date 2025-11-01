declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;

    readonly BETTER_AUTH_SECRET: string;
    readonly BETTER_AUTH_URL: string;

    readonly NEXT_PUBLIC_BASE_URL: string;
  }
}
