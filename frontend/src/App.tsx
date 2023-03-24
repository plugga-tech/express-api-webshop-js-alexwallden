import { useContext, useEffect, useState } from 'react';
import './App.css';
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

function App() {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(new User('6419ec0f178f6bcc3f94824b', 'alex', '"alex@mail.com"', true));
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <CartContext.Provider value={{ order, setOrder }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route path="/" element={!user || !user.loggedIn ? <Login /> : <Products />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="orders" element={user && user.loggedIn ? <ListOrders /> : <Login />}/>
          </Routes>
        </UserContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
