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
