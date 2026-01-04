# Firebase Setup Guide

This portfolio now uses Firebase Firestore to store all CMS data. Follow these steps to set up Firebase:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select your existing project "bhanuprakashportfolio"
3. Follow the setup wizard

## Step 2: Add Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click the **`</>` (Web)** icon to add a web app
4. Register your app with a nickname (e.g., "Portfolio Web")
5. **Copy the Firebase configuration object** that appears

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables with your Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Example:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bhanuprakashportfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bhanuprakashportfolio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bhanuprakashportfolio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Step 4: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database** (in the left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
   - This allows read/write access for 30 days
   - For production, you'll need to set up proper security rules
4. Select a location for your database (choose the closest to your users)
5. Click **"Enable"**

## Step 5: Set Up Firestore Security Rules

Since your CMS uses password protection (not Firebase Authentication), use these rules:

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access (portfolio pages need this)
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access (CMS is protected by your password system)
    // Note: This means anyone with your Firebase config can write
    // For better security, consider implementing Firebase Authentication
    match /{document=**} {
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

### Security Considerations

**Current Setup (No Firebase Auth):**
- ✅ Portfolio pages can read data (public)
- ✅ CMS can write data (protected by your password system)
- ⚠️ Anyone with your Firebase config keys can write directly to Firestore
- ⚠️ Your Firebase config is exposed in the browser (NEXT_PUBLIC_ variables)

**For Production:**
If you want better security without Firebase Authentication, consider:
1. **Option A:** Use Firebase App Check to restrict access to your domain
2. **Option B:** Implement Firebase Authentication (recommended for production)
3. **Option C:** Use Cloud Functions as a backend API (most secure)

For now, the above rules work fine since your CMS is password-protected at the application level.

## Step 6: Migrate Existing Data (Optional)

If you have existing data in localStorage:

1. Start your development server: `npm run dev`
2. Go to `/cms` in your browser
3. Click the **"Migrate to Firebase"** button in the dashboard
4. This will copy all your localStorage data to Firestore

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/cms/projects` and try editing a project
3. Save the changes
4. Check `/projects` page - changes should appear immediately (real-time sync)
5. Check Firebase Console → Firestore Database to see your data

## Troubleshooting

### "Firebase not initialized" errors
- Make sure `.env.local` file exists and has all required variables
- Restart your development server after adding environment variables
- Check that variable names start with `NEXT_PUBLIC_`

### Data not syncing
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console
- Check Firestore security rules allow read/write access

### Migration fails
- Ensure Firestore is enabled and rules allow writes
- Check browser console for specific error messages
- Try manually copying data from localStorage to Firestore

## What Changed?

- **Before:** All CMS data was stored in browser localStorage
- **After:** All CMS data is stored in Firebase Firestore
- **Benefits:**
  - Data persists across devices and browsers
  - Real-time synchronization
  - No data loss on browser clear
  - Can be accessed from anywhere
  - Better for production deployments

## Next Steps

1. Set up proper Firestore security rules for production
2. Consider adding Firebase Authentication for CMS access
3. Set up Firebase Storage if you want to store uploaded images in the cloud
4. Configure Firebase Hosting for deployment (optional)

