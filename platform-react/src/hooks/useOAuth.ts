import { useState } from 'react';

export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string; 
}

export interface GoogleAuthResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);


  const loadGoogleScript = (clientId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (googleScriptLoaded) {
        resolve();
        return;
      }

      if (document.getElementById('google-oauth-script')) {
        setGoogleScriptLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-oauth-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setGoogleScriptLoaded(true);
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

      const element = document.getElementById(elementId);
      if (element) {
        window.google!.accounts.id.renderButton(element, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          locale: 'pl',
        });
      }
    } catch (error) {
      console.error('Error initializing Google button:', error);
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

      return JSON.parse(jsonPayload) as GoogleUser;
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  return {
    isLoading,
    loadGoogleScript,
    initializeGoogleButton,
    parseJwt,
  };
};
