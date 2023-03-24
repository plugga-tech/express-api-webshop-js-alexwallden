import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ServerResponse from '../models/ServerResponse';
import ProductModal from './ProductModal';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import Order from '../models/Order';
import ProductSummary from './ProductSummary';

const Products = () => {
  const { order, setOrder } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchAllProducts = async () => {
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      console.log(data);
      setProducts(data.body as Product[]);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const fetchCategories = async () => {
    const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    console.log(data.body);
    setCategories(data.body);
  };

  const fetchCategory = async (categoryId: string) => {
    const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
    console.log(data);
    setProducts(data.body);
  };

  const createOrder = () => {
    user && setOrder && setOrder({ user: user?.id, products: [] });
  };

  const addToOrder = (product: Product, quantity: number) => {
    const tempOrder = { ...(order as Order) };
    order?.products.push({ productId: product._id, quantity: quantity });
    setOrder && setOrder(tempOrder);
  };

  const placeOrder = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/add`, order);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
    createOrder();
  }, []);

  useEffect(() => {
    console.log(order);
    console.log(products);
  }, [order, products]);

  return (
    <div>
      <button onClick={fetchAllProducts}>All categories</button>
      {categories.map((category, i) => (
        <button key={i} onClick={() => fetchCategory(category._id)}>
          {category.name}
        </button>
      ))}
      {products?.map((product: Product, i) =>
        selectedProduct === product ? (
          <ProductModal selectedProduct={product} setSelectedProduct={setSelectedProduct} addToOrder={addToOrder} key={i} />
        ) : (
          <ProductSummary
            key={i}
            product={product}
            imgSrc="https://picsum.photos/100"
            imgAlt="Random image"
            setSelectedProduct={setSelectedProduct}
            addToOrder={addToOrder}
          />
        )
      )}
      <button onClick={placeOrder}>Place order</button>
    </div>
  );
};

export default Products;
