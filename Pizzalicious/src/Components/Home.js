import './Home.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import { Navigate, useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material'

const baseURL = "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showOnlyVeg, setShowOnlyVeg] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  
  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handleAddButtonClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const selectedSize = document.querySelector('input[name="size"]:checked').value;
    const selectedToppings = [...document.querySelectorAll('input[name="topping"]:checked')].map(topping => topping.value);
    
    const newCartItem = {
      size: selectedSize,
      toppings: selectedToppings,
      quantity: quantity
    };
  
    setCartItems([...cartItems, newCartItem]);
    handlePopupClose([...cartItems, newCartItem]);
  };  

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const { data } = response;
        if (!Array.isArray(data)) {
          setError(new Error("Invalid response data"));
          return;
        }
        setPizzas(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (pizzas.length === 0) {
    return <div className='lod'><p>Please Wait..while we fetch your pizza</p><CircularProgress color="secondary" /></div>;
  }

  return (
    <div className='front'>
      <Header />
      <div className='parent'>
      <button className="new" onClick={() => setShowOnlyVeg(!showOnlyVeg)}>
        {showOnlyVeg ? "Show all" : "Show Veg only"}
      </button>
      <button className="mew" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by price {sortOrder === "asc" ? "↓" : "↑"}
      </button>
      <div className="rating-filter">
        <p>Filter by rating:</p>
        <button onClick={() => handleRatingFilter(0)}>All</button>
        <button onClick={() => handleRatingFilter(1)}>1⭐ and above</button>
        <button onClick={() => handleRatingFilter(2)}>2⭐ and above</button>
        <button onClick={() => handleRatingFilter(3)}>3⭐ and above</button>
        <button onClick={() => handleRatingFilter(4)}>4⭐ and above</button>
        <button onClick={() => handleRatingFilter(5)}>5⭐ only</button>
      </div>
      </div>
      
      <div className="pizza-grid">
      {pizzas
        .filter((pizza) => !showOnlyVeg || pizza.isVeg)
        .filter((pizza) => ratingFilter === 0 || pizza.rating >= ratingFilter)
          .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price))
        .sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price)
        .map((pizza) => (
          <div className="pizza" key={pizza.id}>
            <h1>
              {pizza.name}
            </h1>
            <img src={pizza.img_url} alt={pizza.name} className="pizza-image" />
            <p>{pizza.description}
            </p>
            <p>
              ₹ {pizza.price}{" "}
              <span className="price-rating-separator">|</span> {pizza.rating}⭐ |
              <span
                style={{
                  marginLeft: "10px",
                  padding: "2px 6px",
                  borderRadius: "5px",
                  color: "#fff",
                  backgroundColor: pizza.isVeg ? "#9ccc65" : "#f44336",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {pizza.isVeg ? "Veg" : "Non-veg"}
              </span>
            </p>

            <button className="button" onClick={handleAddButtonClick}>
              Taste it !
            </button>

{showPopup && (
  <div className="popup">
    <div className="popup-content">
      <h2 style={{textAlign: 'center', textDecoration: 'underline'}}>𝐂𝐮𝐬𝐭𝐨𝐦𝐢𝐳𝐞 𝐲𝐨𝐮𝐫 𝐞𝐯𝐞𝐫𝐲 𝐛𝐢𝐭𝐞 🍕</h2>
      <div className="popup-quantity-options">
        <h3>Quantity</h3>
        <div className="popup-quantity-controls">
          <button className="popup-quantity-btn" onClick={decrementQuantity}>
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="popup-quantity-btn" onClick={incrementQuantity}>
            +
          </button>
        </div>
      </div>
      <h3>Choose size</h3>
      <ul className="popup-size-options">
        {pizza.size[0].items.map((item) => (
          <li key={item.size}>
            <input type="radio" name="size" value={item.size} />
            <label>{item.size}</label>
          </li>
        ))}
      </ul>
      <h3>Choose toppings</h3>
      <ul className="popup-topping-options">
        {pizza.toppings[0].items.map((item) => (
          <li key={item.name}>
            <input
              type={item.isRadio ? "radio" : "checkbox"}
              name="topping"
              value={item.name}
            />
            <label>{item.name}</label>
          </li>
        ))}
      </ul>
      <button className="popup-add-to-cart" onClick={handleAddToCart}>Add to cart</button>
      <button className="popup-cancel" onClick={handlePopupClose}>Cancel</button>
    </div>
  </div>
)}
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );  
}

export default Home;
