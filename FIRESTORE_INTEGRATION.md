# Firestore Integration for Blood Bond Website

This document explains the Firestore integration implemented for user authentication and data management.

## Overview

The application now uses Firebase Firestore to store and manage user data alongside Firebase Authentication. This provides a complete user management system with persistent data storage.

## Features Implemented

### 1. Firestore Service (`src/services/firestore.js`)
- **User Document Management**: Create, read, update, and delete user documents
- **Data Validation**: Check for existing emails and phone numbers
- **Timestamp Management**: Automatic creation and update timestamps
- **Query Functions**: Search users by email or phone number

### 2. Enhanced Authentication Context (`src/Context/AuthContext.jsx`)
- **Firestore Integration**: Automatically creates user documents on signup
- **Data Synchronization**: Loads user data from Firestore on authentication
- **Duplicate Prevention**: Checks for existing emails/phones before signup
- **Login Tracking**: Updates last login timestamp in Firestore

### 3. Updated Sign-Up Form (`src/pages/SignUpPage.jsx`)
- **Complete User Data**: Stores full name, phone, DOB, blood type, email
- **Real-time Validation**: Checks for duplicate emails and phone numbers
- **Toast Notifications**: User-friendly error and success messages
- **Data Persistence**: All form data is saved to Firestore

### 4. Updated Sign-In Form (`src/pages/SignInPage.jsx`)
- **Email/Password Authentication**: Switched from phone/OTP to email/password
- **Enhanced Error Handling**: Specific error messages for different failure types
- **Toast Notifications**: Visual feedback for all operations
- **Automatic Data Loading**: User data is loaded from Firestore on successful login

### 5. Toast Notification System
- **Toast Component** (`src/components/Toast.jsx`): Reusable notification component
- **Toast Hook** (`src/hooks/useToast.js`): Custom hook for managing toast state
- **Multiple Types**: Success, error, warning, and info notifications
- **Auto-dismiss**: Configurable duration with manual close option

## Data Structure

### User Document in Firestore
```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  fullName: "John Doe",
  phone: "+1234567890",
  dob: "1990-01-01",
  bloodType: "O+",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLoginAt: Timestamp,
  isActive: true
}
```

## Usage Examples

### Accessing User Data
```javascript
import { useAuth } from "../Context/AuthContext";

const MyComponent = () => {
  const { user, userData } = useAuth();
  
  if (user && userData) {
    console.log("User email:", userData.email);
    console.log("User blood type:", userData.bloodType);
  }
};
```

### Using Toast Notifications
```javascript
import useToast from "../hooks/useToast";

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  
  const handleAction = () => {
    showSuccess("Action completed successfully!");
    showError("Something went wrong!");
    showWarning("Please check your input!");
    showInfo("Here's some information!");
  };
};
```

## Security Rules (Firestore)

Make sure to set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Error Handling

The system includes comprehensive error handling for:
- Duplicate email addresses
- Duplicate phone numbers
- Invalid email formats
- Authentication failures
- Network errors
- Firestore operation failures

## Future Enhancements

1. **User Profile Updates**: Allow users to edit their profile information
2. **Data Validation**: Add more robust client-side validation
3. **Offline Support**: Implement offline data synchronization
4. **Admin Panel**: Create admin interface for user management
5. **Analytics**: Track user engagement and system usage

## Dependencies

- Firebase v12.2.1
- React v19.0.0
- React Router v7.4.1

## File Structure

```
src/
├── services/
│   ├── firebase.js          # Firebase configuration
│   └── firestore.js         # Firestore service functions
├── Context/
│   └── AuthContext.jsx      # Enhanced auth context with Firestore
├── components/
│   ├── Toast.jsx            # Toast notification component
│   └── UserProfile.jsx      # Example user profile component
├── hooks/
│   └── useToast.js          # Toast management hook
└── pages/
    ├── SignInPage.jsx       # Updated sign-in form
    └── SignUpPage.jsx       # Updated sign-up form
```

