import React, { useState } from 'react';

interface IProductSummaryProps {
  product: Product;
  imgSrc: string;
  imgAlt: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addToOrder: (product: Product, quantity: number) => void;
}

const ProductSummary = ({ product, imgSrc, imgAlt, setSelectedProduct, addToOrder }: IProductSummaryProps) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <div className="product-info" onClick={() => setSelectedProduct(product)}>
        <img src={imgSrc} alt={imgAlt} />
        <h2>{product.name}</h2>
        <p>{product.price} kr</p>
      </div>
      <button onClick={decreaseQuantity}>-</button>
      <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={increaseQuantity}>+</button>
      <button onClick={() => addToOrder(product, quantity)}>Add to cart</button>
    </div>
  );
};

export default ProductSummary;
