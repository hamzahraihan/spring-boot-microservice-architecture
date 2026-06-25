import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./app/index.tsx";
import HomeLayout from "./components/layouts/home-layout.tsx";
import { KeycloakProvider } from "./context/KeycloakConnect.tsx";
import ProductLayout from "./components/layouts/product-layout.tsx";
import ProductPage from "./app/product/index.tsx";
import AddProductPage from "./feature/product/components/add-product.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KeycloakProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<ProductLayout />}>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  </StrictMode>,
);
