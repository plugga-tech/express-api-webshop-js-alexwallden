import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import ServerResponse from '../models/ServerResponse';
import { Link, useNavigate } from 'react-router-dom';
import '../style/_signUp.scss';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (passwordOne === passwordTwo) {
        const { data }: AxiosResponse<ServerResponse> = await axios.post<ServerResponse>(`${import.meta.env.VITE_API_URL}/users/add`, {
          name,
          email,
          password: passwordOne,
        });
        console.log(data);

        setName('');
        setEmail('');
        setPasswordOne('');
        setPasswordTwo('');
        navigate('/');
      } else {
        alert('Passwords dont match');
      }
    } catch (err: any) {
      console.log(err.response.data);
      setErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div className="sign-up-component">
      <div className="sign-up-container">
        <h2>Sign up</h2>
        <form>
          <div className="sign-up-form-inputs">
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setErrorMessage(null);
                  setName(e.target.value);
                }}
              />
            </label>
            <label htmlFor="email">
              <input
                type="text"
                placeholder="Mail"
                value={email}
                onChange={(e) => {
                  setErrorMessage(null);
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="password-one">
              <input
                type="password"
                placeholder="Password"
                value={passwordOne}
                onChange={(e) => {
                  setErrorMessage(null);
                  setPasswordOne(e.target.value);
                }}
              />
            </label>
            <label htmlFor="password-two">
              <input
                type="password"
                placeholder="Password again"
                value={passwordTwo}
                onChange={(e) => {
                  setErrorMessage(null);
                  setPasswordTwo(e.target.value);
                }}
              />
            </label>
          </div>
          <button
            onClick={(e) => {
              setErrorMessage(null);
              handleSignUp(e);
            }}
          >
            Sign up
          </button>
        </form>
        <Link to="/">Login</Link>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignUp;
