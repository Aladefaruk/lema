# Deployment Guide for Render

This guide explains how to deploy the backend and frontend separately on Render.

## Backend Deployment

1. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory

2. **Configure the service:**
   - **Name**: `web-developer-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (Render will override this automatically)

3. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the deployed URL (e.g., `https://web-developer-backend.onrender.com`)

## Frontend Deployment

1. **Update the backend URL:**
   - Open `frontend/.env.production`
   - Update `REACT_APP_API_URL` with your deployed backend URL
   - Example: `REACT_APP_API_URL=https://web-developer-backend.onrender.com`

2. **Create a new Static Site on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Select the `frontend` folder as the root directory

3. **Configure the service:**
   - **Name**: `web-developer-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: `https://web-developer-backend.onrender.com` (your backend URL)

4. **Deploy:**
   - Click "Create Static Site"
   - Wait for deployment to complete



## Important Notes

- The backend must be deployed first to get the URL for the frontend configuration
- Update the `REACT_APP_API_URL` in the frontend's environment variables with your actual backend URL
- Both services will auto-deploy when you push changes to the connected GitHub repository
- The backend includes CORS configuration to allow requests from any origin

## Testing the Deployment

1. Visit your frontend URL
2. Verify that the users table loads correctly
3. Test creating and deleting posts
4. Check browser network tab to confirm API calls are going to the correct backend URL

## Troubleshooting

- If the frontend can't connect to the backend, verify the `REACT_APP_API_URL` is correct
- Check Render logs for any deployment errors
- Ensure the backend service is running before testing the frontend