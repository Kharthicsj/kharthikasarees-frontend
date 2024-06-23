import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation.json';
import axios from 'axios';
import Loading from './Loading';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(true); // State to manage loading state

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
        const cartData = localStorage.getItem('cart');
        const userEmailData = localStorage.getItem('userEmail');

        if (!transactionId || !cartData || !userEmailData) {
          console.error('Missing required data:', { transactionId, cartData, userEmailData });
          navigate('/'); // Redirect to home if required data is missing
          return;
        }

        let cart;
        try {
          cart = JSON.parse(cartData);
        } catch (parseError) {
          console.error('Error parsing cart data:', parseError.message);
          console.error('Cart data content:', cartData);
          navigate('/'); // Redirect to home if there is a parsing error
          return;
        }

        // userEmail is a plain string, no need to parse it as JSON
        const userEmail = userEmailData;

        // Proceed with your axios post request here
        await axios.post('https://kharthikasarees-backend.onrender.com/order-successful', {
          transactionId,
          cart,
          userEmail
        });

        setIsValid(true);
      } catch (error) {
        console.error("Error sending order details:", error);
        navigate('/'); // Redirect to home if there was an error
      } finally {
        setLoading(false); // Set loading to false once process completes
      }
    };

    validateOrder();
  }, [location, navigate]);

  if (isLoading) {
    return <Loading />; // Render loading spinner while loading is true
  }

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
