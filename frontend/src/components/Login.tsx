import React, { useContext, useState } from 'react';
import ServerResponse from '../models/ServerResponse';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import User from '../models/User';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password });
      console.log(data);
      if (data.success) {
        console.log(data);
        const user = new User(data.body?._id, data.body.name, data.body.email, data.success);
        setUser && setUser(user)
        setEmail('');
        setPassword('');
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
        </label>
        <button onClick={(e) => handleLogin(e)}>Log in</button>
      </form>
      {error && <p>{error}</p>}
      <div>
        <h3>New user?</h3>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
