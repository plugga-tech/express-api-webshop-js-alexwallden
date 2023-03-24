import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

const ListOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState<any>([])

  const fetchAllOrders = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/user`, { user: user?.id, token: import.meta.env.VITE_API_KEY });
    console.log(response.data.body);
    setOrders(response.data.body);
  };

  useEffect(()=> {
    fetchAllOrders()
  }, [])

  /*POST http://localhost:3000/api/orders/user
Content-Type: application/json

{
    "user": "6418c2e2a31b8fc18e9b0e76",
    "token": "1234key1234"'
} */

  return <div>
    <Link to="/">Home</Link>
    {orders.map((order: any, i: number) => (
      <div key={i}>
        <h2>Order {i + 1}</h2>
        {order.products.map((product: any, i: number) => (
          <div key={i}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    ))}
  </div>;
};

export default ListOrders;
