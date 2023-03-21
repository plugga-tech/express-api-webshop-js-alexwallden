import React, { useContext, useState } from 'react';
import { environment } from '../../environment';
import ServerResponse from '../models/ServerResponse';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import User from '../models/User';

interface ILoginProps {
  setLogin: (toggle: boolean) => void;
}

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(`${environment.API_URL}/users/login`, { email, password });
      console.log(data);
      if (data.success) {
        console.log(data);
        const user = new User(data.body?._id, data.body.name, data.body.email, data.success);
        if (setUser) setUser(user)
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
            placeholder="email"
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
            placeholder="pasword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
        </label>
        <button onClick={(e) => handleLogin(e)}>Log in</button>
      </form>
      {error ? <p>{error}</p> : null}
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
