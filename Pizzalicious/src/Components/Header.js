import React from 'react';
import './Header.css';
import logo from './logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import './Cart.js';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <nav>
        <div className="logo-container">
          <img src={logo} alt="PizzaLicious Logo" className="logo" />
          <h1 className="site-title">PizzaLicious</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/" href="#" className="nav-link">Home</Link></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link contact-link">Contact</a></li>
          <li><Link to="/Cart" className="nav-link cart-icon"><FaShoppingCart /></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
