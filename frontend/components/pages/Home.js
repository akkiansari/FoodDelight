import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container text-center mt-5">
      <h1 className="display-4 mb-4">Welcome to FOODIEDELIGHT</h1>
      <nav>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/add-restaurant" className="btn btn-primary btn-lg custom-btn">Add Restaurant</Link>
          </li>
          <li>
            <Link to="/restaurant-list" className="btn btn-secondary btn-lg custom-btn">View Restaurants</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
