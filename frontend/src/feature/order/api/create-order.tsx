import { api } from "../../../lib/api-client";
import type { OrderType } from "../type/ordertype";

export const createOrder = (data: OrderType, token?: string) => {
  return api.post("/api/order", token, data);
};
