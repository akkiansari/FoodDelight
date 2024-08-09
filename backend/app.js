const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = 8000;

// Use cors to handle CORS errors
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

let restaurants = require('./data.json');

// Helper function to save data to the JSON file
const saveData = (data) => {
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
};

// CRUD operations for restaurants

// Create a new restaurant
app.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    newRestaurant.id = restaurants.length ? restaurants[restaurants.length - 1].id + 1 : 1;
    restaurants.push(newRestaurant);
    saveData(restaurants);
    res.status(201).json(newRestaurant);
});

// Get all restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Get a specific restaurant by ID
app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
});

// Update a restaurant by ID
app.put('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    Object.assign(restaurant, req.body);
    saveData(restaurants);
    res.json(restaurant);
});

// Delete a restaurant by ID
app.delete('/restaurants/:id', (req, res) => {
    const restaurantIndex = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    if (restaurantIndex === -1) return res.status(404).json({ message: 'Restaurant not found' });
    
    const deletedRestaurant = restaurants.splice(restaurantIndex, 1);
    saveData(restaurants);
    res.json(deletedRestaurant);
});

// CRUD operations for menus

// Create a new menu item for a specific restaurant
app.post('/restaurants/:id/menu', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    // Initialize the menu array if it doesn't exist
    if (!restaurant.menu) {
        restaurant.menu = [];
    }

    const newMenuItem = req.body;
    newMenuItem.id = restaurant.menu.length ? restaurant.menu[restaurant.menu.length - 1].id + 1 : 1;
    restaurant.menu.push(newMenuItem);
    saveData(restaurants);
    res.status(201).json(newMenuItem);
});


// Get all menu items for a specific restaurant
app.get('/restaurants/:id/menu', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    res.json(restaurant.menu);
});

// Update a menu item for a specific restaurant
app.put('/restaurants/:id/menu/:menuId', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const menuItem = restaurant.menu.find(m => m.id === parseInt(req.params.menuId));
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    
    Object.assign(menuItem, req.body);
    saveData(restaurants);
    res.json(menuItem);
});

// Delete a menu item for a specific restaurant
app.delete('/restaurants/:id/menu/:menuId', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const menuIndex = restaurant.menu.findIndex(m => m.id === parseInt(req.params.menuId));
    if (menuIndex === -1) return res.status(404).json({ message: 'Menu item not found' });
    
    const deletedMenuItem = restaurant.menu.splice(menuIndex, 1);
    saveData(restaurants);
    res.json(deletedMenuItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
