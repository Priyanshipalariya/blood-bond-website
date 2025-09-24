// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../services/firebase";
// import { 
//   onAuthStateChanged,
//   getAuth,
//   signOut,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   PhoneAuthProvider,
//   signInWithCredential,
//   linkWithCredential,
//   updateProfile
// } from "firebase/auth";
// import { 
//   createUserDocument, 
//   getUserDocument, 
//   updateLastLogin, 
//   checkPhoneExists,
//   getUserByPhone,
//   checkDonationEligibility,
//   getNearbyBloodCamps,
//   createBloodRequest,
//   findAvailableDonors,
//   getUserBloodRequests,
//   getBloodRequestById,
//   updateBloodRequestStatus,
//   deleteBloodRequest
// } from "../services/firestore";

// // Create Context
// const AuthContext = createContext();

// // Hook for consuming context
// export const useAuth = () => useContext(AuthContext);

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

//   useEffect(() => {
//     // Listen to Firebase auth state changes
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
      
//       if (currentUser) {
//         // Load user data from Firestore when user is authenticated
//         const userDoc = await getUserDocument(currentUser.uid);
//         setUserData(userDoc);
//       } else {
//         setUserData(null);
//       }
      
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Initialize reCAPTCHA verifier
//   // const initializeRecaptcha = () => {
//   //   if (!recaptchaVerifier) {
//   //     const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//   //       'size': 'invisible',
//   //       'callback': (response) => {
//   //         console.log("reCAPTCHA solved");
//   //       },
//   //       'expired-callback': () => {
//   //         console.log("reCAPTCHA expired");
//   //       }
//   //     });
//   //     setRecaptchaVerifier(verifier);
//   //     return verifier;
//   //   }
//   //   return recaptchaVerifier;
//   // };

//   // Send OTP to phone number
//   const sendOTP = async (phoneNumber, verifier)=>{
//     try {
//       const formattedPhoneNumber = `+91${phoneNumber.slice(-10)}`;
//       const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier);
//       return confirmationResult;
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       throw error;
//     }
//   };

//   // Verify OTP and sign up
//   const verifyOTPAndSignup = async (confirmationResult, otp, additionalData = {}) => {
//     try {
//       // Check if phone already exists
//       const phoneExists = await checkPhoneExists(additionalData.phone);
//       if (phoneExists) {
//         throw new Error("Phone number already exists");
//       }

//       const result = await confirmationResult.confirm(otp);
//       const user = result.user;

//       // Update user profile with additional data
//       if (additionalData.fullName) {
//         await updateProfile(user, {
//           displayName: additionalData.fullName
//         });
//       }
      
//       // Create user document in Firestore
//       const userDocData = {
//         phone: additionalData.phone,
//         displayName: additionalData.fullName || "",
//         ...additionalData
//       };
      
//       const success = await createUserDocument(user.uid, userDocData);
//       if (!success) {
//         throw new Error("Failed to create user profile");
//       }
      
//       return true;
//     } catch (error) {
//       console.error("Signup error:", error.message);
//       throw error;
//     }
//   };

//   // Verify OTP and sign in
//   const verifyOTPAndSignin = async (confirmationResult, otp) => {
//     try {
//       const result = await confirmationResult.confirm(otp);
//       const user = result.user;

//       // Update last login timestamp in Firestore
//       await updateLastLogin(user.uid);
      
//       return true;
//     } catch (error) {
//       console.error("Signin error:", error.message);
//       throw error;
//     }
//   };

//   // Check if phone number exists (for login)
//   const checkPhoneForLogin = async (phoneNumber) => {
//     try {
//       const userData = await getUserByPhone(phoneNumber);
//       return userData !== null;
//     } catch (error) {
//       console.error("Error checking phone for login:", error);
//       return false;
//     }
//   };

//   // Manually refresh userData from Firestore
//   const refreshUserData = async () => {
//     try {
//       if (!user) return null;
//       const freshDoc = await getUserDocument(user.uid);
//       setUserData(freshDoc);
//       return freshDoc;
//     } catch (error) {
//       console.error("Error refreshing user data:", error);
//       return null;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       return true;
//     } catch (error) {
//       console.error("Logout error:", error.message);
//       return false;
//     }
//   };

//   const value = {
//     user,
//     userData,
//     sendOTP,
//     verifyOTPAndSignup,
//     verifyOTPAndSignin,
//     checkPhoneForLogin,
//     logout,
//     checkDonationEligibility,
//     getNearbyBloodCamps,
//     refreshUserData,
//     createBloodRequest,
//     findAvailableDonors,
//     getUserBloodRequests,
//     getBloodRequestById,
//     updateBloodRequestStatus,
//     deleteBloodRequest
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase"; // Assuming 'auth' is initialized firebase.auth() instance
import { 
  onAuthStateChanged,
  getAuth, // getAuth() is often used to get the auth instance within components, but 'auth' from firebase.js is typically used in a context. Keeping it for completeness if needed elsewhere.
  signOut,
  RecaptchaVerifier, // Still needed if you wanted to use it in other places, but not for this specific setup
  signInWithPhoneNumber,
  PhoneAuthProvider, // Potentially useful for linking/updating phone numbers
  signInWithCredential, // Used with PhoneAuthProvider for advanced flows
  linkWithCredential, // For linking phone to existing user
  updateProfile
} from "firebase/auth";
import { 
  createUserDocument, 
  getUserDocument, 
  updateLastLogin, 
  checkPhoneExists,
  getUserByPhone,
  checkDonationEligibility,
  getNearbyBloodCamps,
  createBloodRequest,
  findAvailableDonors,
  getUserBloodRequests,
  getBloodRequestById,
  updateBloodRequestStatus,
  deleteBloodRequest
} from "../services/firestore";

// Create Context
const AuthContext = createContext();

// Hook for consuming context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load user data from Firestore when user is authenticated
        const userDoc = await getUserDocument(currentUser.uid);
        setUserData(userDoc);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Basic phone normalization to E.164 (defaults to +91 if no country code provided)
  const normalizePhone = (raw) => {
    if (!raw) return "";
    const trimmed = String(raw).trim();
    if (trimmed.startsWith('+')) return trimmed;
    const digits = trimmed.replace(/\D/g, '').slice(-10);
    return `+91${digits}`;
  };

  // Send OTP to phone number (expects/produces E.164)
  const sendOTP = async (phoneNumber, verifier)=>{
    try {
      const formattedPhoneNumber = normalizePhone(phoneNumber);
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier);
      return confirmationResult;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  // Verify OTP and sign up
  const verifyOTPAndSignup = async (confirmationResult, otp, additionalData = {}) => {
    try {
      // Check if phone already exists before confirming the OTP
      // This is a good pre-check to prevent creating duplicate user accounts/profiles.
      const phoneExists = await checkPhoneExists(normalizePhone(additionalData.phone));
      if (phoneExists) {
        throw new Error("Phone number already exists");
      }

      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Update user profile with additional data (like displayName)
      if (additionalData.fullName) {
        await updateProfile(user, {
          displayName: additionalData.fullName
        });
      }
      
      // Create user document in Firestore with additional profile data
      const userDocData = {
        phone: normalizePhone(additionalData.phone),
        displayName: additionalData.fullName || user.displayName || "", // Ensure displayName fallback
        ...additionalData // Spread any other data like dob, bloodType
      };
      
      const success = await createUserDocument(user.uid, userDocData);
      if (!success) {
        // If Firestore document creation fails, consider reverting auth user or logging.
        // For simplicity, we just throw an error here.
        throw new Error("Failed to create user profile");
      }
      
      return true; // Indicate success
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error; // Re-throw for component to handle specific error messages
    }
  };

  // Verify OTP and sign in
  const verifyOTPAndSignin = async (confirmationResult, otp) => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Update last login timestamp in Firestore
      await updateLastLogin(user.uid);
      
      return true;
    } catch (error) {
      console.error("Signin error:", error.message);
      throw error;
    }
  };

  // Check if phone number exists (for login screen, to determine if it's a known user)
  const checkPhoneForLogin = async (phoneNumber) => {
    try {
      const userData = await getUserByPhone(normalizePhone(phoneNumber));
      return userData !== null; // Returns true if user exists, false otherwise
    } catch (error) {
      console.error("Error checking phone for login:", error);
      return false; // Assume not found or error occurred
    }
  };

  // Manually refresh userData from Firestore (e.g., after a profile update)
  const refreshUserData = async () => {
    try {
      if (!user) return null; // Only refresh if a user is logged in
      const freshDoc = await getUserDocument(user.uid);
      setUserData(freshDoc);
      return freshDoc;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return null;
    }
  };

  // Logout current user
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear user and userData state upon successful logout
      setUser(null); 
      setUserData(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error; // Re-throw the error
    }
  };

  // All values and functions to be provided by the context
  const value = {
    user,
    userData,
    sendOTP,
    verifyOTPAndSignup,
    verifyOTPAndSignin,
    checkPhoneForLogin,
    logout,
    // Firestore related functions
    checkDonationEligibility,
    getNearbyBloodCamps,
    refreshUserData,
    createBloodRequest,
    findAvailableDonors,
    getUserBloodRequests,
    getBloodRequestById,
    updateBloodRequestStatus,
    deleteBloodRequest
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after initial authentication state is determined */}
    </AuthContext.Provider>
  );
};
