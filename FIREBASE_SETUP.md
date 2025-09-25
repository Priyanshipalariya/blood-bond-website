# Firebase Setup Instructions

## 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "blood-bond-website")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Phone Authentication
1. In your Firebase project, go to **Authentication** → **Sign-in method**
2. Click on **Phone** and enable it
3. Add your domain to **Authorized domains**:
   - For development: `localhost` (and port if needed, e.g., `localhost:5173`)
   - For production: your actual domain

## 3. Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** icon (`</>`)
4. Register your app with a nickname
5. Copy the Firebase config object

## 4. Update Firebase Config
Replace the placeholder config in `src/firebase.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 5. Test Phone Numbers (Development)
For testing, you can use Firebase's test phone numbers:
- Go to **Authentication** → **Sign-in method** → **Phone**
- Add test phone numbers in the format: `+91 9876543210`
- Use any 6-digit OTP for testing

## 6. Production Setup
- Remove test phone numbers before going live
- Add your production domain to authorized domains
- Consider setting up proper error handling and logging

## Features Implemented
✅ Phone number OTP verification for donor registration
✅ Phone number OTP verification for blood requests  
✅ 3-attempt limit with error handling
✅ Visible reCAPTCHA verification
✅ Indian phone number format (+91)
✅ Resend OTP functionality with timer
✅ Proper error messages and user feedback

## Usage
- **Donor Registration**: After filling the form, user gets OTP verification popup
- **Blood Request**: After selecting blood group and pincode, user gets OTP verification popup
- **Error Handling**: 3 failed attempts redirects user back to previous page
