import { useContext, useEffect, useState } from 'react';
import './App.css';
import UserContext from './context/UserContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import { Route, Routes } from 'react-router';
import User from './models/User';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState<User | null>(null);
  // const [user, setUser] = useState<User | null>(new User('id', 'alex', 'email', true));

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={!user || !user.loggedIn ? <Login /> : <Products />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
