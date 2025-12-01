
const getGoogleClientId = (): string => {
  const clientId = import.meta.env?.VITE_GOOGLE_CLIENT_ID;
  return clientId;
};

export const GOOGLE_CLIENT_ID = getGoogleClientId();

export const OAUTH_CONFIG = {
  google: {
    clientId: GOOGLE_CLIENT_ID,
  },
};
