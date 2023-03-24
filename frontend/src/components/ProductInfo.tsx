import React, { useState } from 'react';
import ProductModal from './ProductModal';
import ProductSummary from './ProductSummary';
import { Product } from '../models/Product';

interface IProductInfoProps {
  product: Product;
  selectedProduct: Product | null;
  addToOrder: (product: Product, quantity: number) => void;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductInfo = ({ product, selectedProduct, addToOrder, setSelectedProduct }: IProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 0)
    setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className='product'>
      {product !== selectedProduct ? (
        <ProductSummary
          product={product}
          imgSrc="https://picsum.photos/100"
          imgAlt="Random image"
          setSelectedProduct={setSelectedProduct}
          addToOrder={addToOrder}
        />
      ) : (
        <ProductModal selectedProduct={product} setSelectedProduct={setSelectedProduct} addToOrder={addToOrder} />
      )}

      <div className="quantity-inputs">
        <button onClick={decreaseQuantity}>-</button>
        <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button className='add-to-cart-btn' onClick={() => addToOrder(product, quantity)}>Add to cart</button>
    </div>
  );
};

export default ProductInfo;
