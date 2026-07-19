// src/global.d.ts
interface Window {
  _env_?: {
    VITE_PUBLIC_API_URL?: string;
    VITE_KEYCLOAK_URL?: string;
    VITE_KEYCLOAK_REALM?: string;
    VITE_KEYCLOAK_CLIENT_ID?: string;
  };
}
