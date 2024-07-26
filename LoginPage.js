
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import yourLogo from '../assets/image (2).png';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    try {
      const response = await fetch('http://localhost:3009/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        console.error('Login failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  };




  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-logo">
            <img src={yourLogo} alt="Your Logo" className="your-logo" />
          </div>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="button" className="forgot-password-button1">Forgot password?</button>
          <button type="submit" className="sign-in-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;







