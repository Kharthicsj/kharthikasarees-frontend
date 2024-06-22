import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation.json';
import axios from 'axios';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const validateOrder = async () => {
      try {
        const transactionId = new URLSearchParams(location.search).get('transactionId');
        
        let cart = null;
        let userEmail = null;

        try {
          cart = JSON.parse(localStorage.getItem('cart'));
        } catch (parseError) {
          console.error('Error parsing cart data:', parseError);
          navigate('/'); // Redirect to home if there is a parsing error
          return;
        }

        try {
          // Check if userEmail is a valid JSON
          userEmail = JSON.parse(localStorage.getItem('userEmail'));
        } catch (parseError) {
          // If JSON.parse fails, assume userEmail is a plain string
          userEmail = localStorage.getItem('userEmail');
        }

        if (!transactionId || !cart || !userEmail) {
          navigate('/'); // Redirect to home if required data is missing
          return;
        }

        await axios.post('https://kharthikasarees-backend.onrender.com/order-successful', {
          transactionId,
          cart,
          userEmail
        });
        setIsValid(true);
      } catch (error) {
        console.error("Error sending order details:", error);
        navigate('/'); // Redirect to home if there was an error
      }
    };

    validateOrder();
  }, [location, navigate]);

  if (!isValid) {
    return null; // Render nothing until validation is complete
  }

  return (
    <div style={styles.container}>
      <Lottie options={defaultOptions} height={200} width={200} />
      <h1 style={styles.message}>Order Placed Successfully!</h1>
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
  }
};

export default OrderSuccess;
