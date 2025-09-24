
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
  updateProfile
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase/config";

// Export Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Enable Firebase phone auth test mode on localhost (per Firebase docs)
if (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') {
  try {
    auth.settings.appVerificationDisabledForTesting = true;
    // eslint-disable-next-line no-console
    console.log("Firebase Auth: appVerificationDisabledForTesting enabled on localhost");
  } catch (_) {
    // ignore if settings not available
  }
}

// For OTP authentication
export { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
  updateProfile
};
