// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import AddRestaurant from './components/AddRestaurant';
import ModifyRestaurant from './components/ModifyRestaurant';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import AddMenuItem from './components/AddMenuItem';
import ModifyMenuItem from './components/ModifyMenuItem';
import MenuItemList from './components/MenuItemList';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Loader from './components/Loader';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/restaurants')
      .then(response => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error fetching restaurants', 'error');
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const addRestaurant = (restaurant) => {
    setLoading(true);
    axios.post('http://localhost:8000/restaurants', restaurant)
      .then(response => {
        setRestaurants([...restaurants, response.data]);
        setLoading(false);
        handleNotification('Restaurant added successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error adding restaurant', 'error');
        console.error('Error adding restaurant:', error);
      });
  };

  const updateRestaurant = (updatedRestaurant) => {
    setLoading(true);
    axios.put(`http://localhost:8000/restaurants/${updatedRestaurant.id}`, updatedRestaurant)
      .then(() => {
        setRestaurants(restaurants.map(restaurant =>
          restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
        ));
        setLoading(false);
        handleNotification('Restaurant updated successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error updating restaurant', 'error');
        console.error('Error updating restaurant:', error);
      });
  };

  const deleteRestaurant = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:8000/restaurants/${id}`)
      .then(() => {
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        setLoading(false);
        handleNotification('Restaurant deleted successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error deleting restaurant', 'error');
        console.error('Error deleting restaurant:', error);
      });
  };

  const addMenuItem = (restaurantId, menuItem) => {
    setLoading(true);
    axios.post(`http://localhost:8000/restaurants/${restaurantId}/menu`, menuItem)
      .then(response => {
        const updatedRestaurants = restaurants.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              menu: [...restaurant.menu, response.data]
            };
          }
          return restaurant;
        });
        setRestaurants(updatedRestaurants);
        setLoading(false);
        handleNotification('Menu item added successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error adding menu item', 'error');
        console.error('Error adding menu item:', error);
      });
  };

  const updateMenuItem = (restaurantId, menuItemId, updatedMenuItem) => {
    setLoading(true);
    axios.put(`http://localhost:8000/restaurants/${restaurantId}/menu/${menuItemId}`, updatedMenuItem)
      .then(() => {
        const updatedRestaurants = restaurants.map(restaurant => {
          if (restaurant.id === restaurantId) {
            const updatedMenu = restaurant.menu.map(item =>
              item.id === menuItemId ? updatedMenuItem : item
            );
            return { ...restaurant, menu: updatedMenu };
          }
          return restaurant;
        });
        setRestaurants(updatedRestaurants);
        setLoading(false);
        handleNotification('Menu item updated successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error updating menu item', 'error');
        console.error('Error updating menu item:', error);
      });
  };

  const deleteMenuItem = (restaurantId, menuItemId) => {
    setLoading(true);
    axios.delete(`http://localhost:8000/restaurants/${restaurantId}/menu/${menuItemId}`)
      .then(() => {
        const updatedRestaurants = restaurants.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              menu: restaurant.menu.filter(item => item.id !== menuItemId)
            };
          }
          return restaurant;
        });
        setRestaurants(updatedRestaurants);
        setLoading(false);
        handleNotification('Menu item deleted successfully!', 'success');
      })
      .catch(error => {
        setLoading(false);
        handleNotification('Error deleting menu item', 'error');
        console.error('Error deleting menu item:', error);
      });
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Notification message={notification.message} type={notification.type} />
            {loading ? <Loader /> : (
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/add-restaurant" element={<AddRestaurant addRestaurant={addRestaurant} />} />
                <Route path="/modify-restaurant/:id" element={<ModifyRestaurant restaurants={restaurants} updateRestaurant={updateRestaurant} />} />
                <Route path="/restaurant-list" element={<RestaurantList restaurants={restaurants} deleteRestaurant={deleteRestaurant} />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails restaurants={restaurants} deleteMenuItem={deleteMenuItem} />} />
                <Route path="/restaurant/:id/menu/add" element={<AddMenuItem restaurants={restaurants} addMenuItem={addMenuItem} />} />
                <Route path="/restaurant/:id/menu/modify/:menuItemId" element={<ModifyMenuItem restaurants={restaurants} updateMenuItem={updateMenuItem} />} />
                <Route path="/restaurant/:id/menu" element={<MenuItemList restaurants={restaurants} deleteMenuItem={deleteMenuItem} />} />
              </Routes>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
