import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import './Auth.css';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  profilePic: File | null;
  description: string;
  isApproved: boolean;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // default role
    profilePic: null,
    description: '',
    isApproved: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const { setUser } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else if (type === 'file' && e.target instanceof HTMLInputElement) {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData({
        ...formData,
        [name]: file,
      });
      if (file) {
        setProfilePicPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.role === 'psychiatrist') {
      const wordCount = formData.description.trim().split(/\s+/).length;
      if (wordCount < 50) {
        setError('Description must be at least 50 words');
        return;
      }

      if (!formData.isApproved) {
        setError('Psychiatrists must be approved to register');
        return;
      }
    }

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          formDataToSubmit.append(key, (formData as any)[key]);
        }
      }

      const response = await axios.post('http://localhost:4000/api/auth/register', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { token } = response.data;
      const userPayload = { username: formData.username, email: formData.email, role: formData.role, token };
      setUser(userPayload);
      localStorage.setItem('user', JSON.stringify(userPayload));
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError('Error registering user');
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} encType='multipart/form-data'>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="psychiatrist">Psychiatrist</option>
      </select>
      {formData.role === 'psychiatrist' && (
        <>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {profilePicPreview && <img src={profilePicPreview} alt="Profile Preview" className="profile-preview" />}
          <textarea
            name="description"
            placeholder="Description (minimum 50 words)"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="isApproved"
              checked={formData.isApproved}
              onChange={handleChange}
            />
            Approved
          </label>
        </>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
