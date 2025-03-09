export const oAuthGoogle = {
  clientId: import.meta.env.VITE_CLIENT_GOOGLE_ID,
  redirectUri:
    (import.meta.env.VITE_URL_FE ?? "http://localhost:5173") +
    import.meta.env.VITE_REDIRECT_GOOGLE_URI,
  authUri: import.meta.env.VITE_AUTH_URI,
};
