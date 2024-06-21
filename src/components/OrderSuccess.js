import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation.json';

const OrderSuccess = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

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
