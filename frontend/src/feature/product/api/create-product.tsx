import { api } from "../../../lib/api-client";
import type { ProductType } from "../../../types/api";

export const createProduct = (token?: string, data?: ProductType) => {
  return api.post("/api/product", token, data);
};
