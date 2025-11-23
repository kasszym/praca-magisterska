import { ref } from "vue";

export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string; // Google user ID
}

export interface GoogleAuthResponse {
  credential: string;
}

export const useOAuth = () => {
  const isLoading = ref(false);
  const googleScriptLoaded = ref(false);

  /**
   * Load Google OAuth Script
   */
  const loadGoogleScript = (clientId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (googleScriptLoaded.value) {
        resolve();
        return;
      }

      // Check if script already exists
      if (document.getElementById('google-oauth-script')) {
        googleScriptLoaded.value = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-oauth-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        googleScriptLoaded.value = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google OAuth script'));
      };

      document.head.appendChild(script);
    });
  };

  /**
   * Initialize Google Sign-In button
   */
  const initializeGoogleButton = async (
    elementId: string,
    clientId: string,
    callback: (response: GoogleAuthResponse) => void
  ): Promise<void> => {
    try {
      // Validate Client ID
      if (!clientId || clientId === "" || clientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
        console.error("❌ Google Client ID is not configured properly!");
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = `
            <div style="padding: 12px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33;">
              <strong>⚠️ Google OAuth nie jest skonfigurowany</strong><br/>
              <small>Sprawdź plik .env i ustaw VITE_GOOGLE_CLIENT_ID</small>
            </div>
          `;
        }
        return;
      }

      await loadGoogleScript(clientId);

      // Wait for google object to be available
      await new Promise<void>((resolve) => {
        const checkGoogle = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(checkGoogle);
            resolve();
          }
        }, 100);
      });

      // Initialize Google Sign-In
      window.google!.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
      });

      // Render the button
      window.google!.accounts.id.renderButton(
        document.getElementById(elementId)!,
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          locale: 'pl',
        }
      );
    } catch (error) {
      console.error('Error initializing Google button:', error);
      throw error;
    }
  };

  /**
   * Parse JWT token to get user info
   */
  const parseJwt = (token: string): GoogleUser | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  /**
   * Trigger Google One Tap
   */
  const showOneTap = async (
    clientId: string,
    callback: (response: GoogleAuthResponse) => void
  ): Promise<void> => {
    try {
      await loadGoogleScript(clientId);

      // Wait for google object to be available
      await new Promise<void>((resolve) => {
        const checkGoogle = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(checkGoogle);
            resolve();
          }
        }, 100);
      });

      window.google!.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
      });

      window.google!.accounts.id.prompt();
    } catch (error) {
      console.error('Error showing Google One Tap:', error);
    }
  };

  return {
    isLoading,
    googleScriptLoaded,
    loadGoogleScript,
    initializeGoogleButton,
    parseJwt,
    showOneTap,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}
