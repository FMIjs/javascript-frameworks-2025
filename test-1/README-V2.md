## JavaScript Работни Рамки

 # Задача за контролно (30 април 2025)
 
## 🏎️ Objective
Build a simple Formula 1 car management app using Angular 19. The app allows users to add, view, edit, and delete F1 cars and their details.

## Requirements
### 🚗 Car List Page:
Display a list of available F1 cars with details like:

Car Model

Team

Engine Manufacturer

Year

Each car should have an option to delete.

Provide a button to navigate to an "Add Car" page.

### 📝 Add Car Page:
Form to add a car with fields:

Car Model (text)

Team (text)

Engine Manufacturer (text)

Year (number)

Button to submit the form and save the car.

### 🌐 Routing:
Implement routing for:

Car List Page (/cars)

Add Car Page (/add-car)

Allow easy navigation between these pages via Angular Router.

### ⚙️ Functionality:
Users should be able to add new F1 cars.

Users should be able to delete existing cars from the list.

### ⭐ Additional Challenges (Bonus):
Form validation:

Car Model and Team fields are required.

Year must be a four-digit positive number (e.g., 2023).

## Hints:

Utilize Angular Forms module for form handling and validation.

Implement a service to manage cars data and interact with it from components (no need to connect to any API service; you can store the cars in a collection).