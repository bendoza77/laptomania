# Laptomania Frontend — Project Overview

## Summary
Laptomania is a laptop e-commerce web app. The frontend is a React application built with Vite, implementing product discovery, user authentication, profile management, and cart interactions. It consumes the Laptomania backend REST API.

## Who Is This For?
- End-users shopping for laptops.
- Store admins managing the catalog (via protected UI and routes if exposed).
- Developers looking for a modular React app with Context-based state management and clean component structure.

## Core Capabilities
- Browsing and viewing laptops via Products and Catalog components
- Authentication flows (Signup/Login) with persisted session
- Profile page for user details
- Cart interactions via context and local storage helpers
- Navigation and basic layout via UI components
- Internationalization readiness via LanguageContext

## Tech Stack and Tools
- React 18
- Vite for dev server and build
- React Router (implied by pages and App.jsx routing)
- Context API for app state (Auth, Cart, Laptop, Language)
- LocalStorage utility for persistence
- ESLint for code quality

## Project Structure
- src/
  - App.jsx — Root routing and layout
  - main.jsx — App bootstrap
  - index.css/App.css — Styles
  - components/
    - UI/Nav.jsx — Navigation bar
    - utils/Catalog.jsx — Product catalog grid/list
    - Laptop.jsx — Individual laptop card/presentation
  - context/
    - AuthContext.jsx — Auth state and actions
    - Cart.content.jsx — Cart state and actions
    - LaptopContext.jsx — Catalog/laptop provider
    - LanguageContext.jsx — i18n context
  - pages/
    - Home.jsx — Landing page
    - Products.jsx — Product listing
    - Profile.jsx — User profile
    - Login.jsx / Signup.jsx — Auth pages
  - utils/
    - LocalStorage.js — Local storage helpers

## UX Flows
- Visitor views Home, navigates to Products
- Auth user logs in/signs up, session stored via AuthContext + LocalStorage
- User adds laptops to cart; Cart context manages state
- Profile allows viewing/updating user info (via backend)

## State Management
- Context providers encapsulate domain concerns:
  - Auth: current user, tokens, login/logout
  - Cart: items, add/update/remove, persistence
  - Laptop: product data fetching and caching
  - Language: current locale and strings

## API Integration
- Fetches laptops list/details
- Auth endpoints for login/signup
- User profile endpoints
- Cart endpoints to sync server-side cart when available

## Setup & Running Locally
1. Environment (if needed)
   - VITE_API_BASE_URL set to backend URL
2. Install Dependencies
   - From client/ directory: `npm install`
3. Run Dev Server
   - `npm run dev`
4. Build
   - `npm run build` then `npm run preview`

## Extensibility Ideas
- Add filtering, sorting, and pagination on Products page
- Add product detail page with specs and gallery
- Secure routes for admin operations
- Global error and toast notifications
- Theming and responsive improvements

## Notes
- Frontend assumes backend provides JWT-based auth and CORS enabled endpoints.
- LocalStorage utility centralizes persistence to avoid duplication.

## License & Credits
This frontend is part of the Laptomania project. See repository root/license files for details if provided.


## API DOCUMENTATION
Postman Collection available in `/postman` folder.

## Base URL: 
http://localhost:3000/api