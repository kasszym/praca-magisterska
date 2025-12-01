import { ref } from "vue";

export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string; 
}

export interface GoogleAuthResponse {
  credential: string;
}

export const useOAuth = () => {
  const isLoading = ref(false);
  const googleScriptLoaded = ref(false);

  const loadGoogleScript = (clientId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (googleScriptLoaded.value) {
        resolve();
        return;
      }
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

  const initializeGoogleButton = async (
    elementId: string,
    clientId: string,
    callback: (response: GoogleAuthResponse) => void
  ): Promise<void> => {
    try {
      if (!clientId || clientId === "" || clientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
        console.error('Invalid Google Client ID');
        return;
      }

      await loadGoogleScript(clientId);

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

  const showOneTap = async (
    clientId: string,
    callback: (response: GoogleAuthResponse) => void
  ): Promise<void> => {
    try {
      await loadGoogleScript(clientId);

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
