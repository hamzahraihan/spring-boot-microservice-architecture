export type OrderType = {
  quantity: number;
  price: number;
  skuCode: string;
  userDetails: UserDetails;
};

export type UserDetails = {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
};

export type ProductType = {
  id?: string;
  name: string;
  description: string;
  skuCode: string;
  price: number;
};
