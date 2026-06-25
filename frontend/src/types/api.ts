export type OrderType = {
  quantity: number;
  price: number;
  skuCode: string;
};

export type ProductType = {
  id?: string;
  name: string;
  description: string;
  skuCode: string;
  price: number;
};
