import Keycloak from "keycloak-js";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { KeycloakContext } from "../hooks/useKeycloak";
import type { UserDetails } from "../types/api";

export interface KeycloakConnectType {
  keycloak: Keycloak | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  userDetails: UserDetails;
}

const keycloakInstance = new Keycloak({
  url: window._env_?.VITE_KEYCLOAK_URL || import.meta.env.VITE_KEYCLOAK_URL,
  realm: window._env_?.VITE_KEYCLOAK_REALM || import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: window._env_?.VITE_KEYCLOAK_CLIENT_ID || import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    firstName: "",
    lastName: "",
  });

  const isInitializingRef = useRef(false);

  useEffect(() => {
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    keycloakInstance
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setIsInitialized(authenticated);

        if (authenticated) {
          keycloakInstance.loadUserProfile().then((profile) =>
            setUserDetails({
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
            }),
          );
        }

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
      value={{
        keycloak: keycloakInstance,
        isAuthenticated,
        isInitialized,
        userDetails,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
