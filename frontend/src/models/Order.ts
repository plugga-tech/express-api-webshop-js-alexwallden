type Order = {
  _id?: string;
  user: string;
  products: { productId: string; quantity: number }[];
};

export default Order;
