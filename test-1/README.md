## JavaScript Работни Рамки

 # Задача за контролно (23 април 2025)

## 🏁 Objective:
Build a simple Formula 1 driver management app using Angular 19. The app allows users to add, view, edit, and delete F1 drivers and their details.

## Requirements:
### 🚗 Driver List Page:
Display a list of F1 drivers with details like:

  Driver Name

  Nationality

  Team

  Number of Wins

Each driver should have an option to delete.

Provide a button to navigate to an "Add Driver" page.

### 📝 Add Driver Page:
Form to add a driver with fields:

  Name (text)

  Nationality (text)

  Team (text)

  Number of Wins (number)

Button to submit the form and save the driver.

### 🌐 Routing:
Implement routing for:

  Driver List Page (/drivers)

  Add Driver Page (/add-driver)

Allow easy navigation between these pages via Angular Router.

### ⚙️ Functionality:
Users should be able to add new F1 drivers.

Users should be able to delete existing drivers from the list.

### ⭐ Additional Challenges (Bonus):
Form validation:
  Name and Team fields are required.
  Number of wins should be a non-negative integer.

## Hints:
Utilize Angular Forms module for form handling and validation.
Implement a service to manage drivers data and interact with it from components (no need to connect to any API service, you can store the drivers in a collection).
There is an empty `drivers-management-client` project already created, just run `npm install` and `ng s` to start it. 