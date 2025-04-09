# Deploying Product Mania to Vercel

This document provides instructions for deploying the Product Mania frontend to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed (optional, for command-line deployment)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "New Project"
4. Import your Git repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Add environment variables:
   - `VITE_API_URL`: URL of your backend API (e.g., `https://product-mania-api.vercel.app/api`)
7. Click "Deploy"

### Option 2: Deploy via Command Line

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to the frontend directory and deploy:
   ```
   cd frontend
   vercel --prod
   ```

4. Follow the prompts to configure your project

## Environment Variables

Make sure to set up the following environment variables in your Vercel project:

- `VITE_API_URL`: The URL of your backend API

## Vercel Configuration

The `vercel.json` file in the project root contains the necessary configuration for proper routing with React Router. This ensures that all routes are directed to the index.html file, which is necessary for client-side routing to work correctly.

## Troubleshooting

- If you encounter 404 errors on routes other than the home page, check that the `vercel.json` file is properly configured with the rewrites rule.
- If the app can't connect to the backend, verify that the `VITE_API_URL` environment variable is correctly set in your Vercel project settings.