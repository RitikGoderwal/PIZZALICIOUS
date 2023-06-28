import React from 'react';
import './Cart.css';
import Header from './Header';
import { useState, useEffect } from "react";
import Home from './Home'
import Footer from './Footer';
import {CircularProgress} from '@mui/material'

function Cart({ cartItems }) {
  const [showEmptyCart, setShowEmptyCart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmptyCart(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className='empty-cart'>
        {showEmptyCart ? (
          cartItems ? (
            cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <p>
                      {item.size} pizza with {item.toppings.join(', ')} x {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <h2 class="empty-cart-message">Oops! Your cart is feeling a bit light</h2>

          )
        ) : (
          <h2>Loading..  <CircularProgress color='success' /></h2>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;



