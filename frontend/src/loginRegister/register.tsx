import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  testCode: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    profilePic: null,
    description: '',
    testCode: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const { setUser } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'file' && e.target instanceof HTMLInputElement) {
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
      const errorMsg = 'Passwords do not match';
      setError(errorMsg);
      window.alert(errorMsg);
      return;
    }

    if (formData.role === 'psychiatrist') {
      const wordCount = formData.description.trim().split(/\s+/).length;
      if (wordCount < 50) {
        const errorMsg = 'Description must be at least 50 words';
        setError(errorMsg);
        window.alert(errorMsg);
        return;
      }

      if (!formData.testCode) {
        const errorMsg = 'You must enter the code sent to you after passing the test';
        setError(errorMsg);
        window.alert(errorMsg);
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
      if (token) {
        navigate('/login');
      }
    } catch (error: any) {
      const errorMsg = error.response && error.response.data && error.response.data.msg
        ? error.response.data.msg
        : 'Error registering user';
      setError(errorMsg);
      window.alert(errorMsg);
    }
  };

  const handleTermsAccept = () => {
    setShowTerms(false);
    window.open('https://zoe-afya-test.zapier.app/', '_blank');
  };

  return (
    <div>
      {showTerms && (
        <div className="terms-popup">
          <div className="terms-content">
            <h2>Terms for Psychiatrists</h2>
            <ol>
              <li>After filling your details you will be redirected to another page/tab to take your test.</li>
              <li>Do not close this current tab/page.</li>
              <li>Passing the test does not automatically mean you are approved.</li>
              <li>Once approval is done, an email will be sent to you containing the login code.</li>
              <li>Put in the code in the code input field you see below.</li>
            </ol>
            <button onClick={handleTermsAccept}>OK</button>
          </div>
        </div>
      )}
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
        <select name="role" value={formData.role} onChange={(e) => {
          handleChange(e);
          if (e.target.value === 'psychiatrist') {
            setShowTerms(true);
          }
        }}>
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
            <input
              type="text"
              name="testCode"
              placeholder="Enter Test Code"
              value={formData.testCode}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit" disabled={formData.role === 'psychiatrist' && !formData.testCode}>Register</button>
        <div>
          <p>Want to login...</p>
          <Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
