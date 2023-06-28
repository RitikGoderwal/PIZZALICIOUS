import React from 'react';
import Cart from './Components/Cart';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/Cart" element = {<Cart/>} />
      </Routes>
    </Router>
  )
}

export default App
