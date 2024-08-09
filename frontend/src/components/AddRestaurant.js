import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = ({ addRestaurant }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRestaurant = { name, description, location };

    axios.post('http://localhost:8000/restaurants', newRestaurant)
      .then(response => {
        addRestaurant(response.data);
        setName('');
        setDescription('');
        setLocation('');
      })
      .catch(error => setError('Error adding restaurant'));
  };

  return (
    <div>
      <h2>Add Restaurant</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
