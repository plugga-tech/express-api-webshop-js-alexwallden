import React, { useState } from 'react';
import { Product } from '../models/Product';

interface IProductSummaryProps {
  product: Product;
  imgSrc: string;
  imgAlt: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addToOrder: (product: Product, quantity: number) => void;
}

const ProductSummary = ({ product, imgSrc, imgAlt, setSelectedProduct, addToOrder }: IProductSummaryProps) => {

  return (
    <div style={{ cursor: 'pointer' }}>
      <div className="product-info" onClick={() => setSelectedProduct(product)}>
        <img src={imgSrc} alt={imgAlt} />
        <h2>{product.name}</h2>
        <p>{product.price} kr</p>
      </div>
    </div>
  );
};

export default ProductSummary;
