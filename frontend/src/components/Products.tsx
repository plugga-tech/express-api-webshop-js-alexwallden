import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ServerResponse from '../models/ServerResponse';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import Order from '../models/Order';
import ProductInfo from './ProductInfo';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import '../style/_products.scss';

interface IProductsProps {
  createOrder: () => void;
  toggleAddedMessage: () => void;
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  fetchAllProducts: () => void;
}

const Products = ({ createOrder, toggleAddedMessage, products, setProducts, fetchAllProducts }: IProductsProps) => {
  const { order, setOrder } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  

  const getCartDataFromLocalstorage = () => {
    const localstorageCartData = localStorage.getItem('cart') || 'null';
    const parsedCartData = JSON.parse(localstorageCartData);

    if (parsedCartData && user && parsedCartData.user === user.id) {
      setOrder && setOrder(parsedCartData);
    } else if (!parsedCartData) {
      createOrder();
    }
  };

  const fetchCategories = async () => {
    const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    setCategories(data.body);
  };

  const fetchCategory = async (categoryId: string) => {
    console.log(categoryId);

    const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
    console.log(data);

    setProducts(data.body);
  };

  const addToOrder = (product: Product, quantity: number) => {
    const tempOrder = { ...(order as Order) };
    order?.products.push({ productId: product._id, quantity: quantity });
    setOrder && setOrder(tempOrder);
    localStorage.setItem('cart', JSON.stringify(tempOrder));
    toggleAddedMessage();
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
    createOrder();
    getCartDataFromLocalstorage();
  }, []);

  return (
    <div className="products-component">
      <div className="category-btns">
        <button onClick={fetchAllProducts}>All categories</button>
        {categories.map((category, i) => (
          <button key={i} onClick={() => fetchCategory(category._id)}>
            {category.name}
          </button>
        ))}
      </div>
      <div className="products-container">
        {products?.map((product: Product, i) => (
          <ProductInfo key={i} product={product} selectedProduct={selectedProduct} addToOrder={addToOrder} setSelectedProduct={setSelectedProduct} />
        ))}
      </div>
    </div>
  );
};

export default Products;
