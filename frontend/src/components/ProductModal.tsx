import React, { useState } from 'react';
import { Product } from '../models/Product';

interface IProductModal {
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addToOrder: (product: Product, quantity: number) => void;
}

const ProductModal = ({ selectedProduct, setSelectedProduct, addToOrder }: IProductModal) => {
  
  const { name, category, description, lager, price, _id } = selectedProduct;

  
  return (
    <div style={{ cursor: 'pointer' }}>
      <div className="product-info" onClick={() => setSelectedProduct(null)}>
        <img src="https://picsum.photos/400/200" alt="" />
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <p>{lager} in stock</p>
        <p>{price} kr</p>
        <p>{_id}</p>
      </div>
      
    </div>
  );
};

export default ProductModal;
