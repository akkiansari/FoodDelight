import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModifyRestaurant = ({ restaurants, updateRestaurant }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const restaurant = restaurants.find((r) => r.id === parseInt(id));
    if (restaurant) {
      setName(restaurant.name);
      setDescription(restaurant.description);
      setLocation(restaurant.location);
    }
  }, [id, restaurants]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !location) {
        setError('All fields are required');
        return;
      }
      setError('');
      const updatedRestaurant = { id: parseInt(id), name, description, location };
      updateRestaurant(updatedRestaurant);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Modify Restaurant</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary mt-3">Update Restaurant</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyRestaurant;
