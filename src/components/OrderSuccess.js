// src/components/OrderSuccess.js
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation.json';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const merchantTransactionId = queryParams.get('merchantTransactionId');

    const verifyOrder = async () => {
      const userEmail = localStorage.getItem('userEmail');
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (!userEmail || cartItems.length === 0 || !merchantTransactionId) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.post('https://kharthikasarees-backend.onrender.com/order-successful', { email: userEmail, cartItems, merchantTransactionId });
        if (response.data.transactionId) {
          setTransactionId(response.data.transactionId);
        }
      } catch (error) {
        console.error("Order verification failed:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [location, navigate]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (loading) {
    return <div style={styles.container}><h1>Loading...</h1></div>;
  }

  return (
    <div style={styles.container}>
      <Lottie options={defaultOptions} height={200} width={200} />
      <h1 style={styles.message}>Order Placed Successfully!</h1>
      <p style={styles.transactionId}>Transaction ID: {transactionId}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  },
  message: {
    color: '#28a745',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  transactionId: {
    color: '#6c757d',
    fontSize: '18px',
    marginTop: '10px'
  }
};

export default OrderSuccess;
