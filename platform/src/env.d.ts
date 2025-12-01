/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUSHER_APP_KEY?: string;
  readonly VITE_PUSHER_APP_CLUSTER?: string;
  // add other VITE_... variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
