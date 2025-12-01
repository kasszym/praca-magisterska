const getGoogleClientId = (): string => {
  return (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
};

export const GOOGLE_CLIENT_ID = getGoogleClientId();

export const OAUTH_CONFIG = {
  google: {
    clientId: GOOGLE_CLIENT_ID,
  },
};
