export {};

declare global {
  interface Window {
    APP_CONFIG: {
      BACKEND_URL: string;
      WS_URL: string;
    };
  }

  // Hacky way for tanstack-query cache key
  interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
  }
}
