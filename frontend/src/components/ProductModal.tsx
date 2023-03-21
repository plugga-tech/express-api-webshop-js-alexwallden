import React from 'react';

interface IProductModal {
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductModal = ({ selectedProduct, setSelectedProduct }: IProductModal) => {
  const { name, category, description, lager, price, id } = selectedProduct;
  return (
    <div onClick={() => setSelectedProduct(null)} style={{cursor: 'pointer'}}>
      <img src="https://picsum.photos/400/200" alt="" />
      <h2>{name}</h2>
      <p>{category}</p>
      <p>{description}</p>
      <p>{lager} in stock</p>
      <p>{price} kr</p>
      <p>{id}</p>
    </div>
  );
};

export default ProductModal;
