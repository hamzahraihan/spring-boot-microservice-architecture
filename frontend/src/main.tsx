import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./app/index.tsx";
import HomeLayout from "./components/layouts/home-layout.tsx";
import { KeycloakProvider } from "./context/KeycloakConnect.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KeycloakProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  </StrictMode>,
);
