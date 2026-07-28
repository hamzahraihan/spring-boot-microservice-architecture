# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary user: store/customer-facing buyer browsing products and placing orders.
- Current flows also expose product creation, likely for demo/operator use.

## Product Purpose

This frontend demonstrates a secure commerce flow in a Spring Boot microservice architecture: users can browse products, place orders, and (in current scope) add products while authenticated flows are handled through Keycloak.

## Positioning

It is a reference/demo implementation that shows how a React web UI integrates with Spring microservices and Keycloak SSO, rather than a generic production storefront.

## Operating Context

- Browser-based React app (Vite).
- Uses environment-configured service endpoints (API gateway and Keycloak).
- Authentication/session behavior is mediated by Keycloak check-sso and token refresh.

## Capabilities and Constraints

- Product listing and order creation flows are implemented.
- Product creation flow is implemented.
- Must preserve Keycloak SSO authentication integration.
- Must preserve microservice API integration via configured backend endpoints.
- Open decision: formal accessibility target/standard is not yet defined.

## Brand Commitments

- Product identity currently uses the name **Microshop** in the UI.

## Evidence on Hand

- Implemented UI routes and flows in `src/main.tsx`, `src/app/index.tsx`, `src/app/product/index.tsx`.
- Product/order/product-create API calls in `src/feature/**/api/*.tsx`.
- Auth integration in `src/context/KeycloakConnect.tsx`.
- Runtime endpoint and Keycloak config in `public/env-config.js`.
- No external proof assets (case studies, testimonials, benchmarks) are present in this frontend project.

## Product Principles

1. Keep flows understandable as a microservice architecture reference, not just a UI demo.
2. Preserve secure-by-default integration through Keycloak-backed auth and token-aware API calls.
3. Favor clear, task-completing paths for browsing and ordering over feature breadth.
4. Keep runtime configuration environment-driven so the same app can run across local and staged service topologies.
