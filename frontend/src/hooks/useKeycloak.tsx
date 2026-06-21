import { createContext, useContext } from "react";
import type { KeycloakConnectType } from "../context/KeycloakConnect";

export const KeycloakContext = createContext<KeycloakConnectType>({
  keycloak: null,
  isAuthenticated: false,
  isInitialized: false,
});

export const useKeycloak = () => useContext(KeycloakContext);
