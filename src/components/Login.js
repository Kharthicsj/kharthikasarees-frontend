import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://kharthikasarees-backend.onrender.com/signin', { email, password });
      console.log('Response from server:', response.data);
      if (response.data.firstName) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
        window.location.reload();
      } else {
        setError(response.data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the request.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Kharthika Sarees</h1>
        <p>Explore the timeless elegance of handloom sarees.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <Link to="/forgot" className="forgot-password-link">Forgot Password?</Link>
        <div className="or-container">
          <span className="or-text">OR</span>
        </div>
        <div className="signup-link-container">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
