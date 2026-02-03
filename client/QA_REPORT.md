# Front-end QA Report

## Overview
Manual exploratory testing and static review were performed against the React/Tailwind front-end. The scope covered shared context providers, high-traffic components (Laptop card, Catalog, Nav, Profile), and the authentication flow.

## Confirmed Bugs

1. **Catalog renders with unstable/duplicate keys**  
   - *File:* `client/src/components/utils/Catalog.jsx`  
   - *Issue:* `<Laptop key={el.id} />` references `el.id`, but Mongo documents expose `_id`. React therefore receives `key={undefined}`, triggering warnings and preventing proper diffing when the dataset changes.  
   - *Impact:* List re-ordering glitches, unnecessary re-renders, risk of modals or animations opening on the wrong card.

2. **Graphics card data never appears / updates**  
   - *Files:* `client/src/components/Laptop.jsx`, `client/src/components/utils/Catalog.jsx` (via props)  
   - *Issue:* UI reads `pro.graphicCard` and PATCH payload uses the same spelling, while the backend schema and creation forms send `graphicsCard`. Because the property names do not match, the displayed value is always `undefined` and updates silently fail.  
   - *Impact:* Users think a laptop lacks a GPU, admins cannot edit the field.

3. **Laptop update modal drops file uploads**  
   - *Files:* `client/src/components/Laptop.jsx`, `client/src/context/LaptopContext.jsx`  
   - *Issue:* `handleSubmit` builds a plain object from the form and `pacthLaptop` sends JSON (`Content-Type: application/json`). File inputs (`<input type="file" name="images" multiple />`) are therefore ignored and never reach the server, while the backend expects `multipart/form-data`.  
   - *Impact:* Admins cannot replace laptop photos and receive no error feedback; backend ends up with stale Cloudinary assets.

4. **Laptop deletions use stale state snapshots**  
   - *File:* `client/src/context/LaptopContext.jsx` (function `laptopDelete`)  
   - *Issue:* After a successful DELETE the state update uses `setLaptops(laptops.filter(...))`. Because `laptops` is the value captured during the last render, concurrent deletions or quick successive API responses can resurrect previously removed items.  
   - *Impact:* Inconsistent UI after bulk deletes; users may see laptops that no longer exist.

5. **Auto-login effect hijacks navigation history**  
   - *File:* `client/src/context/AuthContext.jsx`  
   - *Issue:* On every mount the context tries `/api/auth/autho-login` and unconditionally navigates to `/profile` whenever the call succeeds, even if the user intentionally opened `/products` or `/`.  
   - *Impact:* Deep links and bookmarks are overwritten; returning users can never stay on marketing pages.

## Improvement Tips

1. **Normalize API models in a shared TypeScript definition or Zod schema** to avoid property-name drift (`graphicCard` vs `graphicsCard`).
2. **Wrap fetch logic with a reusable API client** that automatically attaches credentials, handles JSON/FormData detection, and surfaces consistent toast errors.
3. **Introduce optimistic updates with proper rollback** in `LaptopContext` to keep UI responsive while avoiding stale closures—`setLaptops(prev => prev.filter(...))` is the minimal change.
4. **Add route guards instead of global redirects**: expose auth state via context and let each page decide whether to redirect, improving UX and making the app easier to test.
5. **Exercise file inputs via integration tests** (e.g., Cypress + MSW) to ensure multipart flows work; current regressions would have been caught automatically.
