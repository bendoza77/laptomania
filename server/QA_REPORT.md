# Back-end QA Report

## Overview
Static code review of the Express/Mongoose service was executed with a focus on authentication, authorization, laptop CRUD, and resilience of async flows. Tests were performed manually (no automated suite present).

## Confirmed Bugs

1. **Protect middleware swallows JWT errors and never responds**  
   - *File:* `server/middlewares/auth.middleware.js`  
   - *Issue:* The `try`/`catch` block logs errors but does not `return next(error)` or send a response, leaving requests hanging whenever `jwt.verify` fails (expired, tampered, missing secret).  
   - *Impact:* Clients wait forever; Node event loop jams under repeated bad tokens.

2. **Role-based guard mis-parses allowed roles**  
   - *Files:* `server/middlewares/roles.middleware.js`, `server/routers/laptop.router.js`, `server/models/user.model.js`  
   - *Issue:* Router calls `allowedTo("admin, moderator")` (single string), while `allowedTo` splits roles via `roles.join(" ")`, producing `"admin, moderator"`. Since `req.user.role` values are `"admin"`, `"user"`, or misspelled `"amdin"`, the check always fails.  
   - *Impact:* Admin-only endpoints are unreachable; moderators cannot manage laptops.

3. **Laptop deletion attempts to destroy images before confirming laptop exists**  
   - *File:* `server/controllers/laptop.controller.js`  
   - *Issue:* After validating the ID the code immediately executes `laptop.images.map(...)` without verifying `laptop` was found. Accessing `images` on `null` throws, bypassing the “Laptop not found” guard and returning a 500.  
   - *Impact:* Invalid IDs crash the route and leak stack traces.

4. **Laptop updates silently drop newly uploaded images**  
   - *File:* `server/controllers/laptop.controller.js` (`patchLaptopById`)  
   - *Issue:* When multipart files are present the controller uploads them to Cloudinary but assigns `imageUrls = result` (raw Cloudinary objects missing `{url, public_id}`) and never flushes the old images from Cloudinary. The mutated `imageUrls` is also never written back to `laptop.images`.  
   - *Impact:* Back-end stores inconsistent image structures and leaks orphaned assets.

5. **User deletion queries the wrong Mongo method**  
   - *File:* `server/controllers/user.controller.js`  
   - *Issue:* Uses `User.findOneAndDelete(id)` where `id` is a string; this becomes `{ _id: undefined }` and always returns `null`. Valid users can therefore never be deleted.  
   - *Impact:* Admin UI shows success but the document stays in the database.

6. **Patch user endpoint never persists changes**  
   - *File:* `server/controllers/user.controller.js`  
   - *Issue:* After mutating fields on the fetched document the controller returns success without calling `await user.save()`. Updates are discarded.  
   - *Impact:* Profile edits never take effect; client receives a false positive.

7. **Auth cookies misconfigured**  
   - *File:* `server/controllers/auth.controller.js`  
   - *Issue:* Cookie options misspell `sameSite` as `samSite`, so the attribute is never set. Combined with the default `secure` logic, cookies are rejected by browsers over HTTP and CSRF protection is weakened.  
   - *Impact:* Users cannot stay logged in on non-HTTPS dev builds; session cookie is less secure in production.

8. **`User` schema typo creates new role value**  
   - *File:* `server/models/user.model.js`  
   - *Issue:* `enum: ["user", "amdin", "moderator"]` allows `"amdin"` instead of `"admin"`. Admin accounts created via seed scripts will have the wrong role, so role checks fail even after fixing middleware.  
   - *Impact:* No superuser can ever satisfy `role === "admin"` unless the values are patched.

9. **Cart model is an empty file**  
   - *File:* `server/models/cart.model.js`  
   - *Issue:* The file contains only `const mongoose = require("mongoose");` and exports nothing, yet other parts of the project (e.g., `useCart` on the client) expect server-side persistence.  
   - *Impact:* Any future import will crash; feature is effectively unfinished.

10. **API router typos**  
    - *Files:* `server/routers/auth.router.js`, `server/routers/user.router.js`  
    - *Issue:* Endpoint names are inconsistent (`/autho-login` vs `/auth-login`) and HTTP verbs are mismatched (logout uses POST). `user.router` imports `addCart` from `auth.controller` even though it is never exported.  
    - *Impact:* Hard to consume API correctly; dead imports hide real build errors.

## Improvement Tips

1. **Add centralized request validation** (Joi/Zod/Celebrate). Several controllers trust `req.body` and only check for truthy fields; malformed payloads easily reach Mongoose and trigger generic 500s.
2. **Introduce integration tests for auth & role flows** using Supertest + Jest. Critical regressions (typoed enum, role guard misconfig) would have been caught automatically.
3. **Wrap async controllers in transaction helpers** when touching both database and Cloudinary (create/update/delete laptop). This prevents partially completed operations after failures.
4. **Emit structured error responses** from `protect` and other middleware. Right now most branches `return next(new AppError(...))` but some simply `console.log` and continue; surfacing consistent JSON errors will simplify front-end handling.
5. **Implement rate limiting & input sanitization** (`express-rate-limit`, `helmet`, `xss-clean`) to strengthen the API surface before launch.
6. **Use `mongoose.Schema.Types.Decimal128` for price** and store currency metadata to avoid floating point errors when cart totals are computed server-side.
