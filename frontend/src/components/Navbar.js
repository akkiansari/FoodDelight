import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <Link className="navbar-brand" to="/">FOODIEDELIGHT</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/restaurant-list">Restaurant List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-restaurant">Add Restaurant</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
