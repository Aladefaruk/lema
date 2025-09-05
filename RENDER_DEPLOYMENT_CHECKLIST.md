# Render Deployment Checklist

## Backend Deployment Steps

1. **Deploy Backend First**
   - Create Web Service on Render
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Auto-deploy: ✅

2. **Get Backend URL**
   - Copy the deployed backend URL (e.g., `https://web-developer-backend.onrender.com`)

## Frontend Deployment Steps

1. **Update Frontend Configuration**
   ```bash
   cd frontend
   node scripts/update-backend-url.js https://your-backend-url.onrender.com
   ```

2. **Deploy Frontend**
   - Create Static Site on Render
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Environment Variable: `REACT_APP_API_URL=https://your-backend-url.onrender.com`

## Quick Commands

Update backend URL:
```bash
cd frontend
node scripts/update-backend-url.js https://web-developer-backend.onrender.com
```

Test locally with production config:
```bash
cd frontend
npm run build
npx serve -s build
```

## Files Created for Deployment

- `backend/render.yaml` - Backend service configuration
- `backend/config/production.json` - Production port configuration
- `frontend/render.yaml` - Frontend service configuration
- `frontend/scripts/update-backend-url.js` - URL update utility
- Updated `frontend/.env.production` - Production environment variables