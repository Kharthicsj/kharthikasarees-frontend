import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation.json';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const merchantTransactionId = queryParams.get('merchantTransactionId');

    const fetchOrderDetails = async () => {
      try {
        // Fetch user details
        const userEmail = localStorage.getItem('userEmail');
        const userDetailsResponse = await axios.get(`https://kharthikasarees-backend.onrender.com/api/user?email=${userEmail}`);
        const user = userDetailsResponse.data;

        // Fetch order details based on merchantTransactionId
        const orderDetailsResponse = await axios.get(`https://kharthikasarees-backend.onrender.com/api/orders/${merchantTransactionId}`);
        
        if (orderDetailsResponse.data && orderDetailsResponse.data.transactionId) {
          setTransactionId(orderDetailsResponse.data.transactionId);
          setUserDetails(user);
          setCartItems(orderDetailsResponse.data.cartItems);
        } else {
          console.error("Order details not found.");
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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
      <div style={styles.orderDetails}>
        <h3>Order Details:</h3>
        <p>User: {userDetails.firstname} {userDetails.lastname}</p>
        <p>Email: {userDetails.email}</p>
        <p>Phone: {userDetails.phonenumber}</p>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
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
  },
  orderDetails: {
    marginTop: '30px',
    textAlign: 'left',
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }
};

export default OrderSuccess;
