import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddMenuItem = ({ addMenuItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !price) {
        setError('All fields are required');
        return;
      }
      setError('');
      const newMenuItem = { name, description, price: parseFloat(price) };
      addMenuItem(parseInt(id), newMenuItem);
      navigate(`/restaurant/${id}/menu`);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Add Menu Item</h2>
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
            <button type="submit" className="btn btn-primary mt-3">Add Menu Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
