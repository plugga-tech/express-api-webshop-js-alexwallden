import React, { useState } from 'react';

interface IProductModal {
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addToOrder: (product: Product, quantity: number) => void;
}

const ProductModal = ({ selectedProduct, setSelectedProduct, addToOrder }: IProductModal) => {
  const [quantity, setQuantity] = useState(1);
  const { name, category, description, lager, price, _id } = selectedProduct;

  const decreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div onClick={() => setSelectedProduct(null)} style={{ cursor: 'pointer' }}>
      <div className="product-info" onClick={() => setSelectedProduct(selectedProduct)}>
        <img src="https://picsum.photos/400/200" alt="" />
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <p>{lager} in stock</p>
        <p>{price} kr</p>
        <p>{_id}</p>
      </div>
      <button onClick={decreaseQuantity}>-</button>
      <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={increaseQuantity}>+</button>
      <button onClick={() => addToOrder(selectedProduct, quantity)}>Add to cart</button>
    </div>
  );
};

export default ProductModal;
