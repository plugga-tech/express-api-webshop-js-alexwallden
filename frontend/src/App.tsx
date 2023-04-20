import { useContext, useEffect, useState } from 'react';
import './style/_app.scss';
import UserContext from './context/UserContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import { Route, Routes } from 'react-router';
import User from './models/User';
import Header from './components/Header';
import CartContext from './context/CartContext';
import Order from './models/Order';
import ListOrders from './components/ListOrders';
import axios, { AxiosResponse } from 'axios';
import ServerResponse from './models/ServerResponse';
import { Product } from './models/Product';

// TODO: Lägg funktionen som hämtar carten från local storage i Products-komponenten.

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [showOrderPlacedMessage, setShowOrderPlacedMessage] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);

  const fetchAllProducts = async () => {
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(data.body as Product[]);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const showPlacedMessage = () => {
    setShowOrderPlacedMessage(true);
  };

  const toggleAddedMessage = () => {
    setShowAddedMessage(true);
  };

  const createOrder = () => {
    user && setOrder && setOrder({ user: user?.id, products: [] });
  };

  const placeOrder = async () => {
    emptyCart();
    await axios.post(`${import.meta.env.VITE_API_URL}/orders/add`, order);
    localStorage.removeItem('cart');
  };

  const emptyCart = () => {
    createOrder();
    localStorage.removeItem('cart');
  };

  const getUserDataFromLocalstorage = () => {
    const localstorageUserData = localStorage.getItem('user') || 'null';
    const parsedUserData = JSON.parse(localstorageUserData);
    console.log(parsedUserData);
    if (parsedUserData) setUser(parsedUserData);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowOrderPlacedMessage(false);
    }, 2500);
  }, [showOrderPlacedMessage]);

  useEffect(() => {
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2500);
  }, [showAddedMessage]);

  useEffect(() => {
    getUserDataFromLocalstorage();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="App">
      <CartContext.Provider value={{ order, setOrder }}>
        <UserContext.Provider value={{ user, setUser }}>
          {showOrderPlacedMessage && <div className="added-message">Order placed</div>}
          {showAddedMessage && <div className="added-message">Item added</div>}
          <Header placeOrder={placeOrder} emptyCart={emptyCart} showPlacedMessage={showPlacedMessage} fetchAllProducts={fetchAllProducts} />
          <Routes>
            <Route
              path="/"
              element={
                !user || !user.loggedIn ? (
                  <Login />
                ) : (
                  <Products
                    createOrder={createOrder}
                    toggleAddedMessage={toggleAddedMessage}
                    products={products}
                    setProducts={setProducts}
                    fetchAllProducts={fetchAllProducts}
                  />
                )
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="orders" element={user && user.loggedIn ? <ListOrders /> : <Login />} />
          </Routes>
        </UserContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
