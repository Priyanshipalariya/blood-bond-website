import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiy42u7kopyNOd5xlIaHWXWVYum3S0dow",
  authDomain: "blood-bond-website-72589.firebaseapp.com",
  projectId: "blood-bond-website-72589",
  storageBucket: "blood-bond-website-72589.firebasestorage.app",
  messagingSenderId: "86453924968",
  appId: "1:86453924968:web:d94750cdd3c5a2f7b2b7dd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Setup reCAPTCHA verifier
export const setupRecaptcha = (containerId = "recaptcha-container") => {
  // Clear any existing verifier
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.log("Clearing existing reCAPTCHA");
    }
    window.recaptchaVerifier = null;
  }

  // Remove existing container if it exists
  const existingContainer = document.getElementById(containerId);
  if (existingContainer) {
    existingContainer.remove();
  }

  // Create new container
  const container = document.createElement("div");
  container.id = containerId;
  container.style.display = "none"; // Hide it
  document.body.appendChild(container);

  // Create invisible reCAPTCHA
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      console.log("reCAPTCHA solved");
    }
  });

  return window.recaptchaVerifier;
};

