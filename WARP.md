# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a collaboration platform connecting influencers with startups/companies for marketing campaigns. The platform has three user roles: **influencers**, **companies**, and **admins**.

**Architecture**: Full-stack monorepo with separate client and server directories.

## Development Commands

### Server (Backend)
```powershell
cd server
npm install              # Install dependencies
npm run dev             # Start development server with nodemon (http://localhost:5000)
npm start               # Start production server
```

### Client (Frontend)
```powershell
cd client
npm install              # Install dependencies
npm run dev             # Start Vite dev server (http://localhost:8080)
npm run build           # Build for production
npm run build:dev       # Build in development mode
npm run lint            # Run ESLint
npm run preview         # Preview production build
```

## Architecture

### Backend (server/)

**Tech Stack**: Node.js, Express, MongoDB (Mongoose), JWT authentication

**Structure**:
- `src/index.js` - Entry point, middleware setup, route registration
- `src/config/` - Database connection and configuration
- `src/models/` - Mongoose schemas (User, Campaign, Application, Startup, Payment, Review, Message)
- `src/controllers/` - Request handlers for each resource
- `src/routes/` - Express route definitions
- `src/middleware/` - Auth and role-based access control middleware
- `src/services/` - Business logic (payment service currently simulated)
- `src/utils/` - Response helpers and validation utilities

**Key Models**:
- **User**: Supports three roles (`influencer`, `company`, `admin`) with social profiles and follower counts
- **Startup**: Company profile created by company users
- **Campaign**: Marketing campaigns with platform requirements, budget, and minimum follower counts
- **Application**: Influencer applications to campaigns with status tracking
- **Payment**: Simulated payment flow (integrate Stripe/Razorpay in `services/paymentService.js`)
- **Review**: Review system between users
- **Message**: Messaging between influencers and companies

**Authentication Flow**:
1. Use `authMiddleware` to verify JWT tokens (checks `Authorization: Bearer <token>` header)
2. Use `roleMiddleware(...)` to restrict routes by role (e.g., `role("company", "admin")`)
3. JWT tokens expire in 30 days

**Environment Variables** (`.env` in `server/`):
- `MONGO_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret for signing JWT tokens (defaults to "defaultsecret")
- `PORT` - Server port (defaults to 5000)

### Frontend (client/)

**Tech Stack**: React 18, TypeScript, Vite, TanStack Query, React Router, shadcn/ui, Tailwind CSS

**Structure**:
- `src/App.tsx` - Root component with providers (Query, Auth, Tooltip, Toast, Router)
- `src/main.tsx` - Application entry point
- `src/pages/` - Route components (currently Index and NotFound)
- `src/components/` - Reusable UI components (shadcn/ui components)
- `src/lib/` - Utilities and context providers (AuthContext)
- `src/hooks/` - Custom React hooks
- `src/assets/` - Static assets

**Key Features**:
- Path aliases configured: `@/` maps to `src/`
- Auth context with token-based authentication (stored in localStorage)
- shadcn/ui for component library
- TanStack Query for server state management
- Development server runs on port 8080

**Adding New Routes**: Add route definitions in `src/App.tsx` above the catch-all `*` route

## API Endpoints

All endpoints use `http://localhost:5000/api` as the base URL.

**Authentication**:
- `POST /auth/signup` - Register new user (body: name, email, password, role)
- `POST /auth/login` - Login (body: email, password) → returns JWT token

**Startups** (requires company role):
- `POST /startups` - Create startup (requires auth)

**Campaigns**:
- `GET /campaigns` - Public search/list campaigns
- `POST /campaigns` - Create campaign (requires company/admin role)
- `GET /campaigns/:id` - Get single campaign

**Applications** (influencer applies to campaigns):
- `POST /applications` - Apply to campaign (requires influencer auth)

**Payments** (simulated):
- `POST /payments/create` - Create payment (body: campaignId, amount)
- `POST /payments/complete/:paymentId` - Complete payment

**Reviews & Messages**: See respective route files for endpoints.

## Important Notes

- **Social Verification**: Currently manual. Influencers add social profiles with `proofUrl` (screenshot/analytics link); admin verifies later.
- **Payment Integration**: Placeholder implementation. Integrate real payment gateway (Stripe/Razorpay) in `server/src/services/paymentService.js`.
- **Testing**: Use the included `server/postman_collection.json` for API testing with Postman.
- **Role-Based Access**: Always check role requirements when creating new protected routes. Use `authMiddleware` + `roleMiddleware()`.

## Common Patterns

**Creating Protected Routes**:
```javascript
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Example: only companies can create campaigns
router.post("/campaigns", auth, role("company", "admin"), campaignController.create);
```

**User Password Handling**:
- Passwords are auto-hashed on save via Mongoose pre-save hook
- Password field is excluded from queries by default (use `.select("+password")` if needed)
- Use `user.matchPassword(entered)` to verify passwords

**Error Handling**:
- Global error handler is registered last in `src/index.js`
- Controllers should catch errors and use appropriate HTTP status codes
