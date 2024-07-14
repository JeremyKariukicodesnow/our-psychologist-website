import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/userContext'; // Make sure the import path is correct
import { Link, useNavigate } from 'react-router-dom';
import  {jwtDecode, JwtPayload } from 'jwt-decode'; // Corrected import statement
import './Auth.css';
import { BASE_URL } from '../constants/url';

interface LoginFormData {
  email: string;
  username: string;
  password: string;
}

interface DecodedJwtPayload extends JwtPayload {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
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
      const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      const { token } = response.data;
      const decoded = jwtDecode<DecodedJwtPayload>(token);
      const userPayload = {
        username: decoded.user.username,
        email: decoded.user.email,
        token,
        role: decoded.user.role, // Retrieve from decoded token
      };
      setUser(userPayload);
      localStorage.setItem('user', JSON.stringify(userPayload));
      
      console.log('User Role:', userPayload.role); // Log user role here

      if (token) {
        navigate('/home');
      }
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
      <div>
        <p>Don't have an account....</p>
        <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default Login;
