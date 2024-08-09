import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MenuItemList = ({ restaurants, deleteMenuItem }) => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));

  if (!restaurant) {
    return <p>Restaurant not found</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Menu Items for {restaurant.name}</h2>
          <Link to={`/restaurant/${id}/menu/add`} className="btn btn-primary mb-3">Add Menu Item</Link>
          {restaurant.menu.length > 0 ? (
            <ul className="list-group">
              {restaurant.menu.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <span className="badge badge-primary badge-pill">${item.price}</span>
                  </div>
                  <div>
                    <Link to={`/restaurant/${id}/menu/modify/${item.id}`} className="btn btn-warning mr-2">Modify</Link>
                    <button onClick={() => deleteMenuItem(parseInt(id), item.id)} className="btn btn-danger">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items available. Add some!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemList;
