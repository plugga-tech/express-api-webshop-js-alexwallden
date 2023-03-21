import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ServerResponse from '../models/ServerResponse';
import ProductModal from './ProductModal';

const Products = () => {
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
    setProducts(data.body)
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={fetchAllProducts}>
          All categories
        </button>
      {categories.map((category, i) => (
        <button key={i} onClick={() => fetchCategory(category._id)}>
          {category.name}
        </button>
      ))}
      {products?.map((product: Product, i) =>
        selectedProduct === product ? (
          <ProductModal selectedProduct={product} setSelectedProduct={setSelectedProduct} key={i} />
        ) : (
          <div key={i} onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
            <img src="https://picsum.photos/100" alt="Random image" />
            <h2>{product.name}</h2>
            <p>{product.price} kr</p>
          </div>
        )
      )}
    </div>
  );
};

export default Products;
