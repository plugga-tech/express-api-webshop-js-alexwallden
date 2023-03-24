import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../style/_listOrders.scss';

const ListOrders = () => {
  const { user } = useContext(UserContext);
  const [ordersFromDb, setOrdersFromDb] = useState<any>([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/user`, { user: user?.id, token: import.meta.env.VITE_API_KEY });
      console.log(response.data.body);
      setOrdersFromDb(response.data.body);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  /*POST http://localhost:3000/api/orders/user
Content-Type: application/json

{
    "user": "6418c2e2a31b8fc18e9b0e76",
    "token": "1234key1234"'
} */

  return (
    <div className="list-orders-component">
      <Link to="/">Home</Link>
      {ordersFromDb.length > 0 ? (
        ordersFromDb.map((order: any, i: number) => (
          <div className="order" key={i}>
            <h2>Order {i + 1}</h2>
            {order.products.map((product: any, i: number) => (
              <div className="order-product" key={i}>
                <h3>{product.name}</h3>
                <p>{product.price} kr</p>
                <p>Quantity: {product.quantity}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <h2>No orders placed</h2>
      )}
    </div>
  );
};

export default ListOrders;
