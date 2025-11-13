# API created with MongoDB atlas

## 🚀 Live Preview vercel

Check out the live version here: [Live Site](https://householdserviceserver.vercel.app)

# Technologies and npm packages Are Used For This

- Node Js
- Express Js
- Cors
- dot env
- firebase-admin
- JWT
- MongoDB
- nodemon

---

# Key features

## Two Collections

- Services
- Bookings

---

# Booking API Endpoints

- **POST**  
  `http://localhost:4000/bookings/`  
  Book a new service.  
  **Request body:** `serviceId`, `bookingDate`, `price`, `userEmail`.

- **GET**  
  `http://localhost:4000/bookings/my-bookings?email=<userEmail>`  
  Get all bookings of a user.

- **DELETE**  
  `http://localhost:4000/bookings/:id`  
  Cancel/Delete a booking by ID.

- **POST**  
  `http://localhost:4000/bookings/review/:serviceId`  
  Add a review to a service.  
  **Request body:** `rating`, `comment`.  
  **Auth required:** Firebase token.

---

# Service API Endpoints

- **GET**  
  `http://localhost:4000/service/all`  
  Get all services.

- **GET**  
  `http://localhost:4000/service/:id`  
  Get a single service by ID.

- **GET**  
  `http://localhost:4000/service/search?search=<query>`  
  Search services by title, category, or description.

- **GET**  
  `http://localhost:4000/service/category?category=<category>`  
  Get services filtered by category.

- **GET**  
  `http://localhost:4000/service/price?minPrice=<min>&maxPrice=<max>`  
  Get services filtered by price range.

- **GET**  
  `http://localhost:4000/service/my-services?email=<providerEmail>`  
  Get all services created by a specific provider.

- **POST**  
  `http://localhost:4000/service/`  
  Create a new service.  
  **Request body:** service details.

- **PATCH**  
  `http://localhost:4000/service/:id`  
  Update a service by ID.  
  **Request body:** fields to update.

- **DELETE**  
  `http://localhost:4000/service/:id`  
  Delete a service by ID.

---

# App Name: HomeHero – Local Household Service Finder

# purpose: for our daily house work such as plumbing,carpeting, electricity etc problem can be fixed locally.

# Valid Commits done

## Challenge Part Done

## 📁 Server Directory Structure

```bash
server/
├── .env
├── .gitignore
├── encode.js
├── hero-home-service10-firebase-adminsdk.json
├── index.js
├── package.json
├── README.md
├── vercel.json
├── .vercel/
│   └── ... (vercel deployment files)
└── src/
    ├── app.js
    ├── config/
    │   └── firebaseAdmin.js
    ├── controllers/
    │   ├── bookingController.js
    │   └── serviceController.js
    ├── middlewares/
    │   └── verifyFireBaseToken.js
    └── routes/
        ├── bookingRouter.js
        └── serviceRouter.js
```
