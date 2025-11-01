# Collab Platform - Backend 

## Setup
1. Clone / copy files.
2. `cd server`
3. `npm install`
4. Create `.env` (I included your MONGO_URI example already)
5. `npm run dev`

## Key endpoints (Postman)
- Signup
  POST http://localhost:5000/api/auth/signup
  Body (json): { "name":"Anmol", "email":"anmol@example.com", "password":"secret", "role":"company" }

- Login
  POST http://localhost:5000/api/auth/login
  Body: { "email":"anmol@example.com", "password":"secret" }

- Create Startup (company)
  POST http://localhost:5000/api/startups
  Headers: Authorization: Bearer <token>
  Body: { "name":"My Shop", "industry":"retail", "description":"..." }

- Create Campaign (company)
  POST http://localhost:5000/api/campaigns
  Headers: Authorization: Bearer <token>
  Body: { "title":"Promo", "startupId":"...", "platforms":["instagram"], "minFollowers":5000, "budget":10000 }

- Influencer apply
  POST http://localhost:5000/api/applications
  Headers: Authorization: Bearer <influencer_token>
  Body: { "campaignId":"...", "coverMessage":"I can do it", "proposedPrice":3000 }

- Payments (simulated)
  POST http://localhost:5000/api/payments/create
  Headers: Authorization: Bearer <company_token>
  Body: { "campaignId":"...", "amount":5000 }

  POST http://localhost:5000/api/payments/complete/:paymentId

## Notes
- Social verification is manual for now: influencers add social profile with proofUrl and admin can verify.
- Payment integration is simulated; integrate Stripe/Razorpay in services/paymentService.js later.
