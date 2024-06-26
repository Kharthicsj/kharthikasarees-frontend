import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import EmptyBox from '../assets/giftBox.png';
import Loading from './Loading';
import '../styles/Cart.css';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const [userData, setUserData] = useState(null); // State variable for user data
  const userEmail = localStorage.getItem('userEmail'); // Fetch userEmail directly

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userEmail) {
          console.error('User email not found in local storage');
          return;
        }

        const response = await axios.get('https://kharthikasarees-backend.onrender.com/api/user', {
          params: { email: userEmail }
        });

        const userData = response.data;
        setUserData(userData); // Update state with fetched user data

        // Check if all required fields are filled
        if (userData.address && userData.city && userData.state && userData.pincode && userData.phonenumber) {
          setIsAddressUpdated(true);
        } else {
          setIsAddressUpdated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAddressUpdated(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      const price = product.offer ? parseFloat(product.offer) : parseFloat(product.price);
      return total + price;
    }, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!isAddressUpdated) {
      alert('Please update your shipping address data in the account tab before checking out.');
      return;
    }

    if (!userData) {
      alert('User data not loaded. Please try again.');
      return;
    }

    let data = {
      name: userData.firstname, 
      amount: calculateTotal() * 100, 
      number: userData.phonenumber, 
      MID: 'MID' + Date.now(),
      transactionId: 'T' + Date.now()
    };

    setLoading(true);
    try {
      const response = await axios.post('https://kharthikasarees-backend.onrender.com/pay', data);
      if (response.data && response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        console.error('Redirect URL not found in response', response);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return <Loading />;
  }

  return (
    <div className="cart-container">
      <h2 className="bill-title">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="emptyBox-container">
          <img src={EmptyBox} alt="emptyBox" className="emptyBox" />
          <p className="emptyBox-text">Your cart is empty!</p>
        </div>
      ) : (
        <div className="cart">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <Link to={`/${product.category}/${product.id}`} style={{ textDecoration: 'none' }}>
                <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
              </Link>
              <div className="product-details">
                <Link to={`/${product.category}/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-price">₹{product.offer ? product.offer : product.price}</p>
                <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <button className="clear-button" onClick={clearCart}>Clear Cart</button>
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>
          <div className="checkout-container">
            <button className="checkout-button" onClick={handleCheckout} disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
