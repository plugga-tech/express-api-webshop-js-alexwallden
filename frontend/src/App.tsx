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
import axios from 'axios';

// TODO: Lägg funktionen som hämtar carten från local storage i Products-komponenten.

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [showOrderPlacedMessage, setShowOrderPlacedMessage] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/add`, order);
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

  return (
    <div className="App">
      <CartContext.Provider value={{ order, setOrder }}>
        <UserContext.Provider value={{ user, setUser }}>
          {showOrderPlacedMessage && <div className="added-message">Order placed</div>}
          {showAddedMessage && <div className="added-message">Item added</div>}
          <Header placeOrder={placeOrder} emptyCart={emptyCart} showPlacedMessage={showPlacedMessage} />
          <Routes>
            <Route
              path="/"
              element={!user || !user.loggedIn ? <Login /> : <Products createOrder={createOrder} toggleAddedMessage={toggleAddedMessage} />}
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
