import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantList = ({ deleteRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const restaurantsPerPage = 6;

  useEffect(() => {
    // Fetch restaurants from the API
    axios.get('http://localhost:8000/restaurants')
      .then(response => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching restaurants');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRestaurants.length / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Restaurant List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Restaurants"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {currentRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{restaurant.name}</h3>
                <p className="card-text">{restaurant.description}</p>
                <p className="card-text"><small className="text-muted">{restaurant.location}</small></p>
                <Link to={`/restaurant/${restaurant.id}`} className="btn btn-info me-2">View Details</Link>
                <Link to={`/modify-restaurant/${restaurant.id}`} className="btn btn-warning me-2">Modify</Link>
                <button onClick={() => deleteRestaurant(restaurant.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RestaurantList;
