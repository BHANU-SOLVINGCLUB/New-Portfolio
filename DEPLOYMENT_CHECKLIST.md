# Quick Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

- [ ] Firebase project upgraded to **Blaze plan**
- [ ] **Firestore Database** enabled and configured
- [ ] **Firebase Storage** enabled and configured
- [ ] Test build works locally: `npm run build && npm start`

## Environment Variables

Add these to your hosting platform (Vercel/Netlify/etc.):

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `NEXT_PUBLIC_CMS_PASSWORD` (change from default!)

## Firebase Security Rules

### Firestore Rules
- [ ] Rules allow public read access
- [ ] Rules allow write access (or restrict as needed)

### Storage Rules
- [ ] Rules allow public read access
- [ ] Rules allow write access (or restrict as needed)

## Testing

After deployment, verify:

- [ ] Home page loads correctly
- [ ] Projects page displays data from Firestore
- [ ] Project detail pages work
- [ ] Images load from Firebase Storage
- [ ] CMS is accessible at `/cms`
- [ ] CMS password works
- [ ] Can edit content in CMS
- [ ] Changes save to Firestore
- [ ] Changes reflect on portfolio pages (real-time sync)
- [ ] No console errors
- [ ] No hydration errors

## Post-Deployment

- [ ] Update Firebase authorized domains (if using App Check)
- [ ] Set up custom domain (if needed)
- [ ] Monitor Firebase usage
- [ ] Set up error tracking (optional)
- [ ] Test on mobile devices

## Quick Deploy Commands

### Vercel CLI
```bash
vercel --prod
```

### Build & Test Locally
```bash
npm run build
npm start
```

---

**Need help?** See `PRODUCTION_DEPLOYMENT.md` for detailed instructions.


