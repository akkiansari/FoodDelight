import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails = ({ deleteMenuItem }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/restaurants/${id}`)
      .then(response => {
        setRestaurant(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching restaurant details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!restaurant) return <p>Restaurant not found</p>;

  // Ensure menu is an array
  const menuItems = restaurant.menu || [];

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{restaurant.name}</h2>
          <p className="card-text">{restaurant.description}</p>
          <p className="card-text"><strong>Location:</strong> {restaurant.location}</p>

          <h3 className="mt-4">Menu Items</h3>
          {menuItems.length > 0 ? (
            <ul className="list-group">
              {menuItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <span className="badge badge-primary badge-pill">${item.price}</span>
                  </div>
                  <div>
                    <Link
                      to={`/restaurant/${restaurant.id}/menu/modify/${item.id}`}
                      className="btn btn-warning me-2"
                    >
                      Modify
                    </Link>
                    <button
                      onClick={() => deleteMenuItem(restaurant.id, item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items available. Add some!</p>
          )}
          <Link to={`/restaurant/${restaurant.id}/menu/add`} className="btn btn-primary mt-3">
            Add Menu Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
