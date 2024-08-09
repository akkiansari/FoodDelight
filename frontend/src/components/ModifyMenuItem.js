import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModifyMenuItem = () => {
  const { id, menuItemId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/restaurants/${id}`)
      .then(response => {
        const restaurant = response.data;
        const menuItem = restaurant.menu.find((item) => item.id === parseInt(menuItemId));
        if (menuItem) {
          setName(menuItem.name);
          setDescription(menuItem.description);
          setPrice(menuItem.price);
        }
      })
      .catch(error => {
        setError('Error fetching restaurant details');
        console.error(error);
      });
  }, [id, menuItemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !price) {
        setError('All fields are required');
        return;
      }
      setError('');
      const updatedMenuItem = { name, description, price: parseFloat(price) };

      axios.put(`http://localhost:8000/restaurants/${id}/menu/${menuItemId}`, updatedMenuItem)
        .then(response => {
          navigate(`/restaurant/${id}/menu`);
        })
        .catch(error => {
          setError('An unexpected error occurred');
          console.error(error);
        });
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Modify Menu Item</h2>
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
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary mt-3">Update Menu Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyMenuItem;
