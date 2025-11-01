# Environment Configuration

## Server Environment (.env)

Create `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/createrra

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# CORS Configuration (automatically set in server/src/index.js)
CORS_ORIGIN=http://localhost:8080
```

## Client Environment (.env)

Create `client/.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Socket.IO will automatically use the API URL without '/api'
```

## Quick Setup Script

Run this in PowerShell to create both files:

```powershell
# Server .env
@"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/createrra
JWT_SECRET=createrra_secret_key_change_in_production
CORS_ORIGIN=http://localhost:8080
"@ | Out-File -FilePath "C:\Users\bajpa\Projects\collab-platform\server\.env" -Encoding UTF8

# Client .env
@"
VITE_API_URL=http://localhost:5000/api
"@ | Out-File -FilePath "C:\Users\bajpa\Projects\collab-platform\client\.env" -Encoding UTF8

Write-Host "✅ Environment files created successfully!"
```

## Verify Setup

```powershell
# Check server .env
Get-Content C:\Users\bajpa\Projects\collab-platform\server\.env

# Check client .env
Get-Content C:\Users\bajpa\Projects\collab-platform\client\.env
```

## MongoDB Setup

Make sure MongoDB is installed and running:

```powershell
# Check if MongoDB is running
Get-Process mongod

# If not running, start it:
# Option 1: Start as service
Start-Service MongoDB

# Option 2: Start manually
mongod --dbpath="C:\data\db"
```

## Test Connection

```powershell
# Test backend
curl http://localhost:5000

# Should return: "🚀Anmol's Collab Platform API is running..."
```

## Common Issues

### Issue 1: MongoDB not found
```powershell
# Install MongoDB or use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env to your Atlas connection string
```

### Issue 2: Port already in use
```powershell
# Change PORT in server/.env to something else like 5001
# Update VITE_API_URL in client/.env to match
```

### Issue 3: CORS errors
```powershell
# Verify CORS_ORIGIN in server/.env matches your frontend URL
# Default should be: http://localhost:8080
```

---

**Note**: Never commit `.env` files to git. They're already in `.gitignore`.
