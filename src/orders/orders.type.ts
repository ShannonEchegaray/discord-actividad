export type Customer = {
  name: string;
  address: string;
};

export type Product = {
  id: number;
  quantity: number;
};

export type Order = {
  customer: Customer;
  products: Product[];
};
