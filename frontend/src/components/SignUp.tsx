import React, { useState } from 'react';
import { environment } from '../../environment';
import axios, { AxiosResponse } from 'axios';
import ServerResponse from '../models/ServerResponse';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (passwordOne === passwordTwo && passwordOne !== '') {
      const { data }: AxiosResponse<ServerResponse> = await axios.post<ServerResponse>(`${environment.API_URL}/users/add`, {
        name,
        email,
        password: passwordOne,
      });
      setName('');
      setEmail('');
      setPasswordOne('');
      setPasswordTwo('');
    } else {
      console.log('Passwords dont match');
    }
  };
  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            placeholder="Mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password-one">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordOne(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password-two">
          <input
            type="password"
            placeholder="Password again"
            onChange={(e) => {
              setPasswordTwo(e.target.value);
            }}
          />
        </label>
        <button
          onClick={(e) => {
            handleSignUp(e);
          }}
        >
          Sign up
        </button>
      </form>
      <Link to='/'><button>Login</button></Link>
    </div>
  );
};

export default SignUp;
