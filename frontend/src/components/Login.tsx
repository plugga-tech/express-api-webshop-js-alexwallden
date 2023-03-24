import React, { useContext, useState } from 'react';
import ServerResponse from '../models/ServerResponse';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import User from '../models/User';
import '../style/_login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password });
      if (data.success) {
        const user = new User(data.body?._id, data.body.name, data.body.email, data.success);
        setUser && setUser(user);
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login-component">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="login-form-inputs">
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
          </div>
          <button className='login-btn' onClick={(e) => handleLogin(e)}>Log in</button>
        </form>
        {error && <p>{error}</p>}
        <div className='new-user-link-container'>
          <h3>New user?</h3>
          <Link to="/signup">
            <button className="sign-up-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
