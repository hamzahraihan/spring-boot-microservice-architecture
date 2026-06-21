import { api } from "../../../lib/api-client";

export function GetProduct(token?: string) {
  return api.get("/api/product", token);
}
