import React from 'react';

interface IProductModal {
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addToOrder: (product: Product) => void;
}

const ProductModal = ({ selectedProduct, setSelectedProduct, addToOrder }: IProductModal) => {
  const { name, category, description, lager, price, _id } = selectedProduct;
  return (
    <div onClick={() => setSelectedProduct(null)} style={{ cursor: 'pointer' }}>
      <img src="https://picsum.photos/400/200" alt="" />
      <h2>{name}</h2>
      <p>{category}</p>
      <p>{description}</p>
      <p>{lager} in stock</p>
      <p>{price} kr</p>
      <p>{_id}</p>
      <button onClick={() => addToOrder(selectedProduct)}>Add to cart</button>
    </div>
  );
};

export default ProductModal;
