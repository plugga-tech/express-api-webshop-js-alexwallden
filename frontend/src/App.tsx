import { useContext, useEffect, useState } from 'react';
import './App.css';
import UserContext from './context/UserContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import { Route, Routes } from 'react-router';
import User from './models/User';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Products />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
