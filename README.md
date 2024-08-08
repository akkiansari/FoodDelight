# Food Admin Application

https://66b4b58f295bb5f48169a4fd--deft-sawine-f64097.netlify.app/

## Overview

The Food Delivery Application is a web-based platform for managing restaurants and their menus. Built with React.js for the frontend and Node.js for the backend, this application allows users to add, update, and delete restaurant details and menu items. The application also includes features for searching, paginating, and viewing restaurant details and menus.

## Features

### Frontend (React.js)

- **Home Page**: A welcome page with basic application information.
- **Add Restaurant**: A form to add new restaurants with name, description, and location.
- **Modify Restaurant**: A form to update existing restaurant details.
- **Restaurant List**: Displays a paginated and searchable list of all restaurants.
- **Restaurant Details**: Shows detailed information about a restaurant and its menu items. Includes options to modify or delete menu items.
- **Add Menu Item**: A form to add new menu items to a specific restaurant.
- **Modify Menu Item**: A form to update existing menu items in a specific restaurant.
- **Menu Item List**: Displays all menu items for a specific restaurant with options to modify or delete.

### Backend (Node.js)

- **CRUD Operations for Restaurants**:
  - **Create**: Add new restaurant details.
  - **Read**: Get all restaurants or a specific restaurant by ID.
  - **Update**: Modify details of an existing restaurant.
  - **Delete**: Remove a restaurant by ID.

- **CRUD Operations for Menu Items**:
  - **Create**: Add new menu items to a specific restaurant.
  - **Read**: Get all menu items for a specific restaurant.
  - **Update**: Modify details of an existing menu item.
  - **Delete**: Remove a menu item from a specific restaurant.

### Common Features

- **Error Handling**: Proper error messages displayed for API errors and user input issues.
- **Loading Indicators**: Visual feedback when data is being fetched or processed.
- **Notifications**: Success and error messages to inform users of the result of their actions.

## Installation

### Frontend

0. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/food-delivery-app.git
   cd food-delivery-app

## Installation

### Frontend

1. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Start the Development Server**

    ```bash
    npm start
    ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

### Backend

1. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Server**

    ```bash
    npm start
    ```

   The server will run on [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Restaurants

- **GET** `/restaurants`: Retrieve all restaurants.
- **GET** `/restaurants/:id`: Retrieve a specific restaurant by ID.
- **POST** `/restaurants`: Create a new restaurant.
- **PUT** `/restaurants/:id`: Update an existing restaurant.
- **DELETE** `/restaurants/:id`: Delete a restaurant by ID.

### Menu Items

- **GET** `/restaurants/:id/menu`: Retrieve all menu items for a specific restaurant.
- **POST** `/restaurants/:id/menu`: Add a new menu item to a specific restaurant.
- **PUT** `/restaurants/:id/menu/:menuId`: Update an existing menu item.
- **DELETE** `/restaurants/:id/menu/:menuId`: Delete a menu item.

## Development

- **React.js**: Frontend framework used for building the user interface.
- **Node.js**: Backend runtime environment to handle API requests and manage data.
- **Express**: Web application framework for Node.js to handle server-side logic.
- **Axios**: Promise-based HTTP client used for making requests from React components.
