// env-config.js
window._env_ = {
  VITE_PUBLIC_API_URL: "http://api-gateway.default.svc.cluster.local:9000",
  VITE_KEYCLOAK_URL: "http://keycloak.default.svc.cluster.local:8181",
  VITE_KEYCLOAK_REALM: "spring-microservice-security-realm",
  VITE_KEYCLOAK_CLIENT_ID: "react-marketplace-id",
};
