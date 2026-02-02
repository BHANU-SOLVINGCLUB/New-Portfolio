# Production Deployment Guide

This guide will help you deploy your portfolio to production with Firebase integration.

## Pre-Deployment Checklist

- [x] Firebase project upgraded to Blaze plan
- [x] Firestore Database enabled
- [x] Firebase Storage enabled
- [ ] Environment variables configured
- [ ] Security rules updated for production
- [ ] CMS password changed from default
- [ ] Test build locally

## Step 1: Update Firebase Security Rules

### Firestore Security Rules

Go to **Firebase Console → Firestore Database → Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access (portfolio pages)
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access (CMS is password-protected)
    // For better security, consider restricting by domain or IP
    match /{document=**} {
      allow write: if true;
    }
  }
}
```

### Firebase Storage Security Rules

Go to **Firebase Console → Storage → Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access
    match /{allPaths=**} {
      allow read: if true;
      allow write: if true; // CMS is password-protected
    }
  }
}
```

**For Better Security (Optional):**
- Restrict writes to specific domains using Firebase App Check
- Add IP whitelisting
- Implement Firebase Authentication

## Step 2: Configure Environment Variables

### For Vercel Deployment (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_CMS_PASSWORD=your-secure-password
```

4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Redeploy after adding variables

### For Other Platforms

Add the same environment variables in your hosting platform's settings:
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Variables tab
- **Render**: Environment section

## Step 3: Update CMS Password

**Important:** Change the default CMS password before deploying!

1. In your `.env.local` file, add:
   ```env
   NEXT_PUBLIC_CMS_PASSWORD=your-strong-password-here
   ```

2. Or set it directly in your hosting platform's environment variables

3. The CMS password is used at `/cms` route

## Step 4: Test Build Locally

Before deploying, test the production build:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the production build locally
npm start
```

Visit `http://localhost:3000` and verify:
- Portfolio pages load correctly
- CMS is accessible at `/cms`
- Firebase connection works
- Images load from Firebase Storage

## Step 5: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Add environment variables (see Step 2)
7. Click **"Deploy"**

### Option C: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your repository
4. Configure environment variables
5. Deploy

## Step 6: Post-Deployment Verification

After deployment, verify:

1. **Portfolio Pages:**
   - [ ] Home page loads
   - [ ] Projects page displays correctly
   - [ ] Project detail pages work
   - [ ] About page loads
   - [ ] Skills page displays

2. **Firebase Integration:**
   - [ ] Data loads from Firestore
   - [ ] Real-time updates work
   - [ ] Images load from Firebase Storage
   - [ ] No console errors

3. **CMS Access:**
   - [ ] `/cms` route is password-protected
   - [ ] Can edit content
   - [ ] Changes save to Firestore
   - [ ] Images upload to Firebase Storage
   - [ ] Changes reflect on portfolio pages

4. **Performance:**
   - [ ] Pages load quickly
   - [ ] Images are optimized
   - [ ] No hydration errors

## Step 7: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Firebase authorized domains if using App Check

## Step 8: Set Up Firebase App Check (Recommended for Production)

Firebase App Check helps protect your backend resources from abuse.

1. Go to **Firebase Console → App Check**
2. Register your web app
3. Use **reCAPTCHA v3** (free)
4. Add your production domain
5. Update Firestore/Storage rules to require App Check:

```javascript
// Firestore Rules with App Check
allow write: if request.resource.appCheck.token.valid;

// Storage Rules with App Check
allow write: if request.resource.appCheck.token.valid;
```

## Troubleshooting

### Build Fails

- Check environment variables are set correctly
- Verify Firebase config values
- Check for TypeScript errors: `npm run build`

### Firebase Not Working in Production

- Verify environment variables are set in hosting platform
- Check variable names start with `NEXT_PUBLIC_`
- Verify Firebase project is on Blaze plan
- Check browser console for errors

### Images Not Loading

- Verify Firebase Storage is enabled
- Check Storage security rules allow read access
- Verify image URLs are correct in Firestore
- Check browser network tab for failed requests

### CMS Not Accessible

- Verify `NEXT_PUBLIC_CMS_PASSWORD` is set
- Check password is correct
- Clear browser cache and localStorage
- Try incognito mode

## Production Best Practices

1. **Security:**
   - Use strong CMS password
   - Consider Firebase Authentication
   - Enable Firebase App Check
   - Regularly review security rules

2. **Performance:**
   - Optimize images before uploading
   - Use Next.js Image component
   - Enable Vercel Analytics
   - Monitor Firebase usage

3. **Monitoring:**
   - Set up Firebase usage alerts
   - Monitor Vercel analytics
   - Check error logs regularly
   - Set up uptime monitoring

4. **Backup:**
   - Export Firestore data regularly
   - Keep backups of important content
   - Version control your code

## Firebase Pricing (Blaze Plan)

The free tier includes:
- **Firestore:** 1 GB storage, 50K reads/day, 20K writes/day
- **Storage:** 5 GB storage, 1 GB downloads/day
- **Hosting:** 10 GB storage, 360 MB/day transfer

For a portfolio site, you'll likely stay within free limits. Monitor usage in Firebase Console.

## Support

If you encounter issues:
1. Check Firebase Console for errors
2. Check Vercel deployment logs
3. Check browser console for client errors
4. Review this guide's troubleshooting section


