# Environment Variables Setup Guide

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your-mongodb-connection-string-here"
# Example: DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/gsg-website?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
# Generate secret with: openssl rand -base64 32

# OAuth Providers
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-secret"

# UploadThing (for file uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Admin Configuration
ADMIN_EMAIL="admin@gazaskygeeks.com"

# Production Environment (Netlify)
# Set NEXTAUTH_URL to your production domain when deploying
# NEXTAUTH_URL="https://yourdomain.netlify.app"
```

## Required Services Setup

### 1. MongoDB Atlas (Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string and add it to `DATABASE_URL`

### 2. Google OAuth
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

### 3. UploadThing (File Uploads)
1. Go to https://uploadthing.com/
2. Create a free account
3. Create a new app
4. Copy your App ID and Secret

### 4. Generate NextAuth Secret
Run in terminal:
```bash
openssl rand -base64 32
```
