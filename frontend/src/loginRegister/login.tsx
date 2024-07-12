// src/components/Login.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import './Auth.css';

interface LoginFormData {
  email: string;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
      const { token } = response.data;
      const userPayload = {
        username: formData.username,
        email: formData.email,
        token,
        role: 'user', // or retrieve from response if available
      };
      setUser(userPayload);
      localStorage.setItem('user', JSON.stringify(userPayload));
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError('Error logging in user');
      }
    }
  };

  return (
    <form className="auth-form font-poppins" onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
