interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_FEATURE_FLAG: string;
    readonly VITE_CLIENT_GOOGLE_ID: string;
    readonly VITE_URL_FE: string;
    readonly VITE_REDIRECT_GOOGLE_URI: string;
    readonly VITE_AUTH_URI: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }