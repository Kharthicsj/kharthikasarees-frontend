import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserHeader.css";
import KSlogo from "../assets/loginLogo.png";
import searchIcon from "../assets/search.svg";

const UserHeader = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="header-background">
      <img src={KSlogo} alt="KS Logo" className="kslogo" draggable="false"></img>
      <div className="search-box">
        <img src={searchIcon} alt="search-icon" className="search" draggable="false" />
        <h3 id="intro-text">Find your Ethnic Elegance</h3>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="material-symbols-outlined">menu</span>
      </div>
      <div className={`user-options ${menuOpen ? 'open' : ''}`}>
        <button className="theme-button" onClick={toggleTheme}>
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/account">Account</Link>
        <Link to="/cart">Cart</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserHeader;
