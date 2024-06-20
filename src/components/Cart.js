import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import EmptyBox from '../assets/giftBox.png';
import Loading from './Loading';
import "../styles/Cart.css";
import axios from 'axios';

const Cart = () => {

  let data = {
    name: "kharthic",
    amount: 1,
    number: '8903443449',
    MID: 'MID' + Date.now(),
    transactionId: 'T' + Date.now()
  }

  const { cart, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/pay', data);
      if (response.data && response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        console.error('Redirect URL not found in response', response);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
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
                <p className="product-price">₹{product.price}</p>
                <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <button className="clear-button" onClick={clearCart}>Clear Cart</button>
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>
          <div className="checkout-container">
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
