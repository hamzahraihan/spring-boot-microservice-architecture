import Keycloak from "keycloak-js";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { KeycloakContext } from "../hooks/useKeycloak";

export interface KeycloakConnectType {
  keycloak: Keycloak | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const keycloakInstance = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    keycloakInstance
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setIsInitialized(authenticated);

        setInterval(() => {
          keycloakInstance.updateToken(60).catch(() => {
            console.error("Failed to refresh token or session expired");
          });
        }, 60000);
      })
      .catch((err) => {
        console.error("Keycloak initialiization failed", err);
        setIsInitialized(true);
      });
  }, []);

  return (
    <KeycloakContext.Provider
      value={{ keycloak: keycloakInstance, isAuthenticated, isInitialized }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
