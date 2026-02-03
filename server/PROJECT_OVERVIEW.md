# Laptomania Backend — Project Overview

## Summary
Laptomania is an e-commerce application focused on laptop discovery and purchasing. The backend provides a secure REST API for authentication, product management, cart operations, and user administration. It is built with Node.js and Express, uses MongoDB for persistence, and integrates with Cloudinary for image handling.

## Who Is This For?
- Shoppers who want to browse laptops, view details, and manage a cart.
- Store administrators who need to manage catalog data and users.
- Developers seeking a clean, extensible Node/Express codebase with role-based access control and modular architecture.

## Core Capabilities
- Authentication and Authorization
  - Signup/Login with JWT-based sessions
  - Protected routes via auth middleware
  - Role-based access control for admin-only endpoints
- Laptop Catalog
  - CRUD operations for laptop items
  - Image upload and management (Cloudinary)
- Cart Management
  - Add/remove products, view cart contents, and quantity updates
- User Management
  - Retrieve/update user profiles (secured)
  - Admin operations for managing users
- Centralized Error Handling
  - Consistent API error responses with custom error class

## Tech Stack and Tools
- Runtime: Node.js
- Web Framework: Express
- Database: MongoDB (via Mongoose models)
- Auth: JWT
- Media: Cloudinary (upload and storage)
- Validation/Utilities: Custom AppError and CatchAsync helpers
- Development: Vite (frontend), ESLint, Environment variables (not shown), Git

## Project Structure
- app.js — Express app bootstrap, middleware registration, routers mounting, and error handler
- controllers/
  - auth.controller.js — Login/Signup, token issuance
  - laptop.controller.js — Laptop CRUD and image handling
  - user.controller.js — User profile/admin actions
  - error.controller.js — Central error formatting
- middlewares/
  - auth.middleware.js — JWT verification, user extraction
  - roles.middleware.js — Role guard (e.g., admin)
- models/
  - user.model.js — User schema (credentials, roles)
  - laptop.model.js — Laptop schema (specs, images)
  - cart.model.js — Cart schema (items per user)
- routers/
  - auth.router.js — Auth routes
  - laptop.router.js — Laptop routes
  - user.router.js — User routes
- config/
  - cloudinary.js — Cloudinary SDK configuration
  - uploadImages.js — Upload helpers/middleware
- utils/
  - AppError.js — Custom error class
  - CatchAsync.js — Async wrapper for controllers
  - images.js — Image processing helpers

## API Overview (High Level)
- /api/auth
  - POST /signup, POST /login
- /api/users
  - GET /me (auth), PATCH /me (auth)
  - Admin endpoints (guarded by roles)
- /api/laptops
  - GET list/detail, POST/PUT/PATCH/DELETE (admin)
- /api/cart
  - GET current cart, POST add item, PATCH update qty, DELETE remove item

Note: Exact route names may vary based on implementation details in router files.

## Security
- JWT tokens are required for protected endpoints.
- Role middleware restricts admin-only actions.
- Centralized error handling to avoid leaking sensitive data.

## Setup & Running Locally
1. Environment Variables (example)
   - MONGODB_URI=<your-mongodb-uri>
   - JWT_SECRET=<your-secret>
   - JWT_EXPIRES_IN=<e.g., 7d>
   - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
2. Install Dependencies
   - From server/ directory: `npm install`
3. Start Server
   - `npm run dev` (if configured with nodemon) or `npm start`
4. Verify
   - Hit health or basic routes; use a tool like Postman/Insomnia.

## Development Conventions
- Controllers are thin and async-wrapped with CatchAsync.
- Errors use AppError for consistent status codes/messages.
- Auth/role middlewares precede protected routes.
- Models encapsulate schema concerns and basic constraints.

## Extensibility Ideas
- Add search/filter/sort/pagination for laptops
- Order/checkout flow and payments integration
- Rate limiting and request validation (e.g., Joi/Zod)
- Email verification and password reset

## License & Credits
This backend is part of the Laptomania project. See repository root/license files for details if provided.


## API DOCUMENTATION
Postman Collection available in `/postman` folder.

## Base URL: 
http://localhost:3000/api