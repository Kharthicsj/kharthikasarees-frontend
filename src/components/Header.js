import React, { useState, useEffect } from 'react';
import "../styles/Header.css";
import KSlogo from "../assets/loginLogo.png";
import LoginLogo from "../assets/Loginlogo.svg";
import UserHeader from './UserHeader';



const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <UserHeader handleLogout={handleLogout} />
      ) : (
        <div className="header-background">
          <img src={KSlogo} alt="KS Logo" className="kslogo" draggable='false'></img>
          <button className='Login' onClick={() => { window.location.href = '/login'; }}>
            <img src={LoginLogo} alt='LoginLogo' id='loginLogo' draggable='false'></img>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
