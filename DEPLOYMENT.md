# Deployment Guide - Collab Platform

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (or MongoDB server)
- Domain name (optional)
- Hosting service account (Vercel, Render, Heroku, etc.)

## Option 1: Deploy to Vercel + Render (Recommended)

### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd client
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Backend (Render.com)

1. **Create New Web Service** on Render.com
2. **Connect your GitHub repository**
3. **Configure Build Settings**:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Root Directory: `/`

4. **Set Environment Variables**:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_string
   PORT=5001
   NODE_ENV=production
   ```

5. **Add CORS Origins** - Update `server/src/index.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-vercel-app.vercel.app', 'https://your-domain.com'],
     credentials: true
   }));
   ```

## Option 2: Deploy to Heroku

### Backend

1. **Create Heroku App**
   ```bash
   cd server
   heroku create your-app-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   ```

3. **Create Procfile** in server directory:
   ```
   web: node src/index.js
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Frontend

1. **Build Production Bundle**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL`

## Option 3: VPS Deployment (DigitalOcean, AWS EC2, etc.)

### Backend Setup

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js and PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd collab-platform/server
   npm install
   ```

4. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

5. **Start with PM2**
   ```bash
   pm2 start src/index.js --name collab-backend
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Frontend Setup

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Setup Nginx for Frontend**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/collab-platform/client/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Environment Variables Reference

### Backend (.env)
```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_super_secret_random_string_here

# Server Port
PORT=5001

# Node Environment
NODE_ENV=production

# Optional: Payment Gateway
STRIPE_SECRET_KEY=sk_live_...
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Verify messaging system works
- [ ] Check campaign creation and viewing
- [ ] Test on mobile devices
- [ ] Setup monitoring (PM2, Sentry, etc.)
- [ ] Configure database backups
- [ ] Setup CDN for static assets (optional)
- [ ] Enable gzip compression
- [ ] Setup rate limiting
- [ ] Configure error logging

## Monitoring

### Backend Monitoring with PM2
```bash
pm2 monit
pm2 logs collab-backend
```

### Database Monitoring
- Enable MongoDB Atlas monitoring
- Set up alerts for high CPU/memory usage
- Configure automatic backups

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is added to CORS whitelist
   - Check that credentials are enabled

2. **Database Connection Failed**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure network access is configured

3. **Authentication Not Working**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Ensure cookies/localStorage work

## Performance Optimization

1. **Enable compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add caching headers**
3. **Optimize images**
4. **Enable HTTP/2**
5. **Use CDN for static assets**

## Backup Strategy

1. **Database**: Daily automated backups via MongoDB Atlas
2. **Code**: Version control with Git
3. **Environment Variables**: Securely stored and documented

## Support

For deployment issues, check:
- Server logs: `pm2 logs`
- Browser console for frontend errors
- Network tab for API requests
- MongoDB Atlas logs

Your Collab Platform is ready for production! 🎉
