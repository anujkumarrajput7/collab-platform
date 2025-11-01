# CREATERRA — Creator/Brand Collaboration Platform

A full‑stack platform for brands and influencers to run real‑time campaigns, messaging, reels/posts, payments (simulated), and more.

## Tech
- Frontend: Vite + React + TypeScript + Tailwind (glass/aurora UI)
- Backend: Node.js + Express + MongoDB (Mongoose)
- Realtime: Socket.IO (events scaffolded)

## Quick start
```bash
# 1) Install deps
npm --prefix server install
npm --prefix client install

# 2) Configure env
cp server/.env.example server/.env
cp client/.env.example client/.env

# 3) Run dev
npm --prefix server run dev
npm --prefix client run dev
# Frontend http://localhost:8080  |  API http://localhost:5000/api
```

## Environment
Create the following files (never commit secrets):

`server/.env`
```
MONGO_URI=mongodb://127.0.0.1:27017/createrra
JWT_SECRET=replace-me
```

`client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

> TIP: For cloud deploys, configure environment variables on the host (Render, Railway, Vercel, etc.).

## Scripts
- server: `npm run dev` (nodemon), `npm start`
- client: `npm run dev`, `npm run build`, `npm run preview`

## Features
- Lux landing + dashboard (aurora/glass, animated counters)
- Campaigns with min‑followers, payments (simulated), ratings
- Messaging with rules (influencer→influencer; influencer→company only if accepted or company initiated)
- Reels/Posts with media + optional audio track, likes (per‑user), comments drawer, share to DM
- Uploads endpoint (local disk) for images/video/audio

## Security & compliance
NEVER commit secrets or private data.
- Keep `.env*`, keys, service accounts OUT of Git.
- Use `.env.example` for variable names only.
- Add test/demo data that contains no real PII.

See the checklist below.

## Git hygiene / .gitignore
We ignore secrets, builds, caches, and local uploads. Review `.gitignore` before committing.

## API (selected)
- `POST /api/upload` → { url }
- Posts: `GET /api/posts`, `POST /api/posts`, `POST /api/posts/:id/like`, `GET/POST /api/posts/:id/comments`
- Messages: `POST /api/messages`, `GET /api/messages/thread/:userId`
- Campaigns: `GET /api/campaigns`, `POST /api/campaigns`, `DELETE /api/campaigns/:id`

## License
Proprietary – internal project.

# Collab Platform

A full-stack collaboration platform connecting influencers with startups/companies for marketing campaigns.

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18 + TypeScript
- Vite
- TanStack Query
- React Router
- shadcn/ui + Tailwind CSS

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or cloud)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd collab-platform
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000

npm run dev
```
Server will run on http://localhost:5000

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```
Client will run on http://localhost:8080

## Using the Application

### 1. Open your browser
Navigate to http://localhost:8080

### 2. Create an account
- Click "Sign Up"
- Enter your details
- Choose role: **Influencer** or **Company**
- Submit the form

### 3. Explore the Dashboard
After logging in, you'll see different features based on your role:

**For Companies:**
- Create and manage campaigns
- View applications from influencers
- Manage startup profiles

**For Influencers:**
- Browse available campaigns
- Apply to campaigns
- Manage your profile and social accounts

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Startups
- `POST /startups` - Create startup (requires company role)

### Campaigns
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Create campaign (requires company role)
- `GET /campaigns/:id` - Get single campaign

### Applications
- `POST /applications` - Apply to campaign (requires influencer role)

### Payments
- `POST /payments/create` - Create payment
- `POST /payments/complete/:paymentId` - Complete payment

## Features

✅ User authentication (JWT)
✅ Role-based access control (Influencer, Company, Admin)
✅ Campaign management
✅ Application system
✅ Social profile management
✅ Messaging system
✅ Review system
✅ Payment tracking (simulated)

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

## Project Structure

```
collab-platform/
├── server/
│   ├── src/
│   │   ├── config/      # Database & configuration
│   │   ├── models/      # Mongoose schemas
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & role middleware
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utilities
│   │   └── index.js     # Entry point
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   ├── lib/         # API & contexts
│   │   ├── hooks/       # Custom hooks
│   │   └── App.tsx      # Root component
│   └── package.json
└── README.md
```

## Notes

- Social verification is currently manual
- Payment integration is simulated (integrate Stripe/Razorpay in `server/src/services/paymentService.js`)
- Postman collection available in `server/postman_collection.json`

## Next Steps

- [ ] Integrate real payment gateway (Stripe/Razorpay)
- [ ] Add real-time messaging with WebSockets
- [ ] Implement social media OAuth verification
- [ ] Add file upload for campaign assets
- [ ] Implement analytics dashboard
- [ ] Add email notifications
