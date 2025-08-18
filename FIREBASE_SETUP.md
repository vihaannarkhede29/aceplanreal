# Firebase Authentication Setup for AcePlan

This guide will help you set up Firebase Authentication for your AcePlan tennis app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "aceplan-tennis")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click on the "Sign-in method" tab
4. Click "Google" in the list of providers
5. Click "Enable" and configure:
   - Project support email: Your email address
   - Click "Save"

## Step 3: Get Your Firebase Config

1. In your Firebase project dashboard, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "aceplan-web")
6. Copy the firebaseConfig object

## Step 4: Update Your Firebase Configuration

1. Open `src/lib/firebase.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Configure Authorized Domains

1. In Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your domains:
   - `localhost` (for development)
   - Your production domain when you deploy

## Step 6: Test the Authentication

1. Start your development server: `npm run dev`
2. Take the quiz and wait for results
3. After 15 seconds, the login modal should appear
4. Click "Sign in with Google" to test authentication

## Features Included

✅ **Google Sign-in**: Users can sign in with their Google account
✅ **15-second delay**: Login modal appears automatically after quiz results
✅ **Manual sign-in**: "Sign in to Save Results" button in header
✅ **User profile**: Shows saved quiz results for logged-in users
✅ **Local storage**: Quiz results are saved locally and can be synced to Firebase
✅ **Responsive design**: Works on all devices with tennis-themed styling

## Security Notes

- Firebase handles all authentication securely
- User data is stored locally (localStorage) for now
- You can extend this to store data in Firebase Firestore later
- Google handles password security and account recovery

## Troubleshooting

**Login modal not appearing:**
- Check browser console for errors
- Verify Firebase config is correct
- Ensure Google Auth is enabled in Firebase Console

**Google sign-in not working:**
- Check if domain is authorized in Firebase Console
- Verify Google Auth provider is enabled
- Check browser console for authentication errors

**User profile not showing:**
- Ensure user is successfully signed in
- Check if quiz results exist in localStorage
- Verify AuthContext is properly wrapped around components

## Next Steps (Optional)

1. **Add Firestore**: Store user data and quiz results in the cloud
2. **User Management**: Add profile editing and preferences
3. **Data Sync**: Sync quiz results across devices
4. **Analytics**: Track user engagement and quiz completion rates

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure all required packages are installed
4. Check Firebase Console for authentication logs
