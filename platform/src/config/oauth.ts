// Google OAuth Configuration
// Get your Client ID from: https://console.cloud.google.com/apis/credentials

const getGoogleClientId = (): string => {
  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
  
  if (!clientId || clientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
    console.error(
      "⚠️ GOOGLE CLIENT ID NOT CONFIGURED!\n" +
      "Please follow these steps:\n" +
      "1. Go to https://console.cloud.google.com/apis/credentials\n" +
      "2. Create OAuth 2.0 Client ID (Web application)\n" +
      "3. Add authorized JavaScript origin: http://localhost:5173\n" +
      "4. Copy the Client ID\n" +
      "5. Create .env file in platform folder (copy from .env.example)\n" +
      "6. Add: VITE_GOOGLE_CLIENT_ID=your-client-id-here\n" +
      "7. Restart the dev server\n"
    );
    return "";
  }
  
  return clientId;
};

export const GOOGLE_CLIENT_ID = getGoogleClientId();

// You can add other OAuth providers here in the future
export const OAUTH_CONFIG = {
  google: {
    clientId: GOOGLE_CLIENT_ID,
  },
};
