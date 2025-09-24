// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
// import { Input } from "../components/Input";
// import { Button } from "../components/Button";
// import { GiHeartDrop } from "react-icons/gi";
// import { IoArrowBack } from "react-icons/io5";
// import { useAuth } from "../Context/AuthContext";
// import useToast from "../hooks/useToast";
// import Toast from "../components/Toast";
// import AuthPage from "./AuthPage";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";


// const SignInPage = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isLoginLoading, setIsLoginLoading] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     // Creates the verifier instance when the component mounts
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'invisible',
//       'callback': (response) => {
//         console.log("reCAPTCHA solved, ready to send OTP for sign-in.");
//       }
//     });
//   }, []);

//   const navigate = useNavigate();
//   const { sendOTP, verifyOTPAndSignin, checkPhoneForLogin } = useAuth();
//   const { toasts, removeToast, showSuccess, showError } = useToast();

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setIsLoginLoading(true);

//     try {
//       // Check if phone number exists
//       const phoneExists = await checkPhoneForLogin(phone);
//       if (!phoneExists) {
//         showError("No account found with this phone number. Please sign up first.");
//         setIsLoginLoading(false);
//         return;
//       }

//       const verifier = window.recaptchaVerifier;
//       const result = await sendOTP(phone, verifier);
//       setConfirmationResult(result);
//       setIsOtpSent(true);
//       showSuccess("OTP sent successfully to your phone number!");
//     }
//     catch (error) {
//       if (error.code === "auth/invalid-phone-number") {
//         showError("Invalid phone number format. Please enter a valid phone number.");
//       } else if (error.code === "auth/too-many-requests") {
//         showError("Too many requests. Please try again later.");
//       } else {
//         showError("Failed to send OTP. Please try again.");
//       }
//     }
//     finally {
//       setIsLoginLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     setIsLoginLoading(true);

//     try {
//       if (!otp) {
//         showError("Please enter the OTP.");
//         return;
//       }

//       if (!confirmationResult) {
//         showError("No OTP session found. Please request OTP again.");
//         return;
//       }

//       const success = await verifyOTPAndSignin(confirmationResult, otp);

//       if (success) {
//         showSuccess("You have successfully signed in!");
//         navigate("/");
//       }
//     }
//     catch (error) {
//       if (error.code === "auth/invalid-verification-code") {
//         showError("Invalid OTP. Please check and try again.");
//       } else if (error.code === "auth/code-expired") {
//         showError("OTP has expired. Please request a new one.");
//       } else {
//         showError("An error occurred during sign in. Please try again.");
//       }
//     }
//     finally {
//       setIsLoginLoading(false);
//     }
//   };

//   return (
//     <AuthPage>
//       {/* Toast Notifications */}
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           message={toast.message}
//           type={toast.type}
//           duration={toast.duration}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}

//       <div className="flex flex-col min-h-screen justify-center mx-8">
//         {/* reCAPTCHA Container */}
//         <div id="recaptcha-container"></div>

//         {/* Back Arrow */}
//         <div className="absolute top-6 left-6">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors duration-200"
//           >
//             <IoArrowBack className="text-2xl" />
//             <span className="font-medium">Back to Home</span>
//           </Link>
//         </div>

//         <div className="md:hidden text-center mb-7">
//           <div className="flex items-center justify-center gap-2">
//             <GiHeartDrop className="h-10 w-10 text-red-700" />
//             <h1 className="text-red-700 text-4xl font-bold">Blood Bond</h1>
//           </div>
//           <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
//         </div>

//         <div className="flex items-center justify-center bg-red-100">
//           <Card className="py-10 px-8 mx-auto w-full max-w-lg bg-white">
//             <CardHeader>
//               <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
//               <CardDescription className="text-center text-gray-500">
//                 Enter the details to access your account
//               </CardDescription>
//             </CardHeader>

//             <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="phone">Phone Number</label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+1234567890"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 {isOtpSent && (
//                   <div className="space-y-2">
//                     <label htmlFor="otp">Enter OTP</label>
//                     <Input
//                       id="otp"
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                       maxLength="6"
//                     />
//                     <p className="text-sm text-gray-500">
//                       We've sent a 6-digit code to {phone}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>

//               <CardFooter className="flex flex-col space-y-2">
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoginLoading}
//                 >
//                   {isLoginLoading
//                     ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...")
//                     : (isOtpSent ? "Verify OTP & Sign In" : "Send OTP")
//                   }
//                 </Button>

//                 {isOtpSent && (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => {
//                       setIsOtpSent(false);
//                       setOtp("");
//                       setConfirmationResult(null);
//                     }}
//                     disabled={isLoginLoading}
//                   >
//                     Change Phone Number
//                   </Button>
//                 )}

//                 <div className="text-center text-sm space-y-2">
//                   <div>
//                     Don't have an account?{" "}
//                     <Link to="/signup" className="text-red-600 hover:underline">
//                       Sign up
//                     </Link>
//                   </div>
//                   <div>
//                     By signing in, you agree to our{" "}
//                     <Link
//                       to="/terms-and-conditions"
//                       target="_blank"
//                       className="text-red-600 hover:text-red-800 underline font-medium"
//                     >
//                       Terms and Conditions
//                     </Link>
//                   </div>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </AuthPage>
//   );
// };

// export default SignInPage;


// import { useState, useEffect, useRef } from "react"; // Import useRef
// import { Link, useNavigate } from "react-router-dom"; // Ensure Link and useNavigate are from react-router-dom
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
// import { Input } from "../components/Input";
// import { Button } from "../components/Button";
// import { GiHeartDrop } from "react-icons/gi";
// import { IoArrowBack } from "react-icons/io5";
// import { useAuth } from "../Context/AuthContext";
// import useToast from "../hooks/useToast";
// import Toast from "../components/Toast";
// import AuthPage from "./AuthPage";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// const SignInPage = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isLoginLoading, setIsLoginLoading] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   // Use useRef to store the RecaptchaVerifier instance
//   const recaptchaVerifierRef = useRef(null);

//   const navigate = useNavigate();
//   const { sendOTP, verifyOTPAndSignin, checkPhoneForLogin } = useAuth();
//   const { toasts, removeToast, showSuccess, showError, showWarning } = useToast(); // Added showWarning

//   useEffect(() => {
//     const auth = getAuth();
    
//     // Initialize RecaptchaVerifier for invisible reCAPTCHA
//     recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'invisible', // This makes it invisible
//       'callback': (response) => {
//         console.log("reCAPTCHA invisible challenge resolved or auto-verified for sign-in.");
//       },
//       'expired-callback': () => {
//         console.log("reCAPTCHA response expired. User might need to try again for sign-in.");
//         // Optionally clear reCAPTCHA if it expires.
//         if (recaptchaVerifierRef.current) {
//           recaptchaVerifierRef.current.clear();
//         }
//         showWarning("Security check expired. Please try sending OTP again.");
//       },
//       'error-callback': (error) => {
//         console.error("reCAPTCHA error for sign-in:", error);
//         showError("Security check failed to load. Please refresh and try again.");
//       }
//     });

//     // Render the reCAPTCHA. For invisible, this often just sets up the backend mechanism
//     recaptchaVerifierRef.current.render().then(() => {
//       console.log("reCAPTCHA widget rendered (invisible) for sign-in.");
//     }).catch(error => {
//       console.error("Error rendering reCAPTCHA for sign-in:", error);
//       showError("Failed to load security verification. Please check your network or try again.");
//     });

//     // Cleanup function for useEffect to clear reCAPTCHA on component unmount
//     return () => {
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//         recaptchaVerifierRef.current = null;
//       }
//     };
//   }, [showError, showWarning]); // Include toast functions in dependencies if they are stable


//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setIsLoginLoading(true);

//     try {
//       // Check if phone number exists
//       const phoneExists = await checkPhoneForLogin(phone);
//       if (!phoneExists) {
//         showError("No account found with this phone number. Please sign up first.");
//         setIsLoginLoading(false);
//         // Clear reCAPTCHA if phone number doesn't exist to allow a fresh attempt
//         if (recaptchaVerifierRef.current) {
//           recaptchaVerifierRef.current.clear();
//         }
//         return;
//       }

//       // Ensure reCAPTCHA verifier is loaded before attempting to send OTP
//       if (!recaptchaVerifierRef.current) {
//         showError("Security verification is not ready. Please refresh the page.");
//         setIsLoginLoading(false);
//         return;
//       }

//       // Pass the reCAPTCHA verifier instance to your sendOTP function
//       const verifier = recaptchaVerifierRef.current;
//       const result = await sendOTP(phone, verifier);
//       setConfirmationResult(result);
//       setIsOtpSent(true);
//       showSuccess("OTP sent successfully to your phone number!");
//     }
//     catch (error) {
//       console.error("Error sending OTP:", error);
//       if (error.code === "auth/invalid-phone-number") {
//         showError("Invalid phone number format. Please enter a valid phone number (e.g., +1234567890).");
//       } else if (error.code === "auth/too-many-requests") {
//         showError("Too many OTP requests. Please try again later.");
//       } else if (error.code === "auth/captcha-check-failed") { // Specific error for reCAPTCHA failure
//         showError("Security verification failed. Please try again.");
//       } else if (error.code === "auth/code-expired") { // This might happen if recaptcha was very old
//         showError("OTP session expired. Please request a new one.");
//       }
//       else {
//         showError("Failed to send OTP. Please try again.");
//       }
//       // IMPORTANT: Clear the reCAPTCHA if OTP sending fails
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//       }
//     }
//     finally {
//       setIsLoginLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     setIsLoginLoading(true);

//     try {
//       if (!otp) {
//         showError("Please enter the OTP.");
//         return;
//       }

//       if (!confirmationResult) {
//         showError("No OTP session found. Please request OTP again.");
//         return;
//       }

//       const success = await verifyOTPAndSignin(confirmationResult, otp);

//       if (success) {
//         showSuccess("You have successfully signed in!");
//         navigate("/");
//       }
//     }
//     catch (error) {
//       console.error("Error verifying OTP:", error);
//       if (error.code === "auth/invalid-verification-code") {
//         showError("Invalid OTP. Please check and try again.");
//       } else if (error.code === "auth/code-expired") {
//         showError("OTP has expired. Please request a new one.");
//       } else {
//         showError("An error occurred during sign in. Please try again.");
//       }
//       // Optionally clear reCAPTCHA here too if you want to force a re-challenge
//       // after failed OTP verification attempts, though it's less common for sign-in.
//     }
//     finally {
//       setIsLoginLoading(false);
//     }
//   };

//   return (
//     <AuthPage>
//       {/* Toast Notifications */}
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           message={toast.message}
//           type={toast.type}
//           duration={toast.duration}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}

//       <div className="flex flex-col min-h-screen justify-center mx-8">
//         {/*
//           This div with id="recaptcha-container" is used by RecaptchaVerifier.
//           For invisible reCAPTCHA, it doesn't typically display interactive UI within it,
//           but the reCAPTCHA API might still use it internally or for placing a badge (usually bottom-right).
//           Keep it to satisfy the RecaptchaVerifier constructor's expectation for an element.
//         */}
//         <div id="recaptcha-container"></div>

//         {/* Back Arrow */}
//         <div className="absolute top-6 left-6">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors duration-200"
//           >
//             <IoArrowBack className="text-2xl" />
//             <span className="font-medium">Back to Home</span>
//           </Link>
//         </div>

//         <div className="md:hidden text-center mb-7">
//           <div className="flex items-center justify-center gap-2">
//             <GiHeartDrop className="h-10 w-10 text-red-700" />
//             <h1 className="text-red-700 text-4xl font-bold">Blood Bond</h1>
//           </div>
//           <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
//         </div>

//         <div className="flex items-center justify-center bg-red-100">
//           <Card className="py-10 px-8 mx-auto w-full max-w-lg bg-white">
//             <CardHeader>
//               <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
//               <CardDescription className="text-center text-gray-500">
//                 Enter the details to access your account
//               </CardDescription>
//             </CardHeader>

//             <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="phone">Phone Number</label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+1234567890"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 {isOtpSent && (
//                   <div className="space-y-2">
//                     <label htmlFor="otp">Enter OTP</label>
//                     <Input
//                       id="otp"
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                       maxLength="6"
//                     />
//                     <p className="text-sm text-gray-500">
//                       We've sent a 6-digit code to {phone}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>

//               <CardFooter className="flex flex-col space-y-2">
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoginLoading}
//                 >
//                   {isLoginLoading
//                     ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...")
//                     : (isOtpSent ? "Verify OTP & Sign In" : "Send OTP")
//                   }
//                 </Button>

//                 {isOtpSent && (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => {
//                       setIsOtpSent(false);
//                       setOtp("");
//                       setConfirmationResult(null);
//                       // Clear reCAPTCHA state if the user decides to change phone number
//                       if (recaptchaVerifierRef.current) {
//                         recaptchaVerifierRef.current.clear();
//                       }
//                     }}
//                     disabled={isLoginLoading}
//                   >
//                     Change Phone Number
//                   </Button>
//                 )}

//                 <div className="text-center text-sm space-y-2">
//                   <div>
//                     Don't have an account?{" "}
//                     <Link to="/signup" className="text-red-600 hover:underline">
//                       Sign up
//                     </Link>
//                   </div>
//                   <div>
//                     By signing in, you agree to our{" "}
//                     <Link
//                       to="/terms-and-conditions"
//                       target="_blank"
//                       className="text-red-600 hover:text-red-800 underline font-medium"
//                     >
//                       Terms and Conditions
//                     </Link>
//                   </div>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </AuthPage>
//   );
// };

// export default SignInPage;
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrected import
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { GiHeartDrop } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../Context/AuthContext";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";
import AuthPage from "./AuthPage";
import { getAuth, RecaptchaVerifier } from "firebase/auth";


const SignInPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Use useRef to store the RecaptchaVerifier instance
  const recaptchaVerifierRef = useRef(null);

  const navigate = useNavigate();
  const { sendOTP, verifyOTPAndSignin, checkPhoneForLogin } = useAuth();
  const { toasts, removeToast, showSuccess, showError, showWarning } = useToast(); // Added showWarning

  useEffect(() => {
    const auth = getAuth();
    
    // Only create a new RecaptchaVerifier if one doesn't exist
    // and if the container element is available in the DOM.
    if (!recaptchaVerifierRef.current && document.getElementById('recaptcha-container')) {
        recaptchaVerifierRef.current = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("reCAPTCHA invisible challenge resolved or auto-verified for sign-in.");
            },
            'expired-callback': () => {
                console.log("reCAPTCHA response expired. User might need to try again for sign-in.");
                if (recaptchaVerifierRef.current) {
                    recaptchaVerifierRef.current.clear();
                }
                showWarning("Security check expired. Please try sending OTP again.");
            },
            'error-callback': (error) => {
                console.error("reCAPTCHA error for sign-in:", error);
                showError("Security check failed to load. Please refresh and try again.");
            }
        }, auth);
        console.log("RecaptchaVerifier instance created (invisible) for sign-in.");
    }

    // Cleanup function for useEffect to clear reCAPTCHA on component unmount
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
        console.log("RecaptchaVerifier instance cleared on unmount for sign-in.");
      }
    };
    // Dependency array: Ensure useEffect re-runs if auth instance changes or toast functions are unstable
  }, [showError, showWarning]);


  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      // Check if phone number exists
      const phoneExists = await checkPhoneForLogin(phone);
      if (!phoneExists) {
        showError("No account found with this phone number. Please sign up first.");
        setIsLoginLoading(false);
        // Clear reCAPTCHA if phone number doesn't exist to allow a fresh attempt
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          console.log("RecaptchaVerifier cleared because phone number not found.");
        }
        return;
      }

      // Ensure reCAPTCHA verifier is loaded before attempting to send OTP
      if (!recaptchaVerifierRef.current) {
        showError("Security verification is not ready. Please refresh the page.");
        setIsLoginLoading(false);
        return;
      }

      // Pass the reCAPTCHA verifier instance to your sendOTP function
      const verifier = recaptchaVerifierRef.current;
      const result = await sendOTP(phone, verifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      showSuccess("OTP sent successfully to your phone number!");
    }
    catch (error) {
      console.error("Error sending OTP:", error);
      if (error.code === "auth/invalid-phone-number") {
        showError("Invalid phone number format. Please enter a valid phone number (e.g., +1234567890).");
      } else if (error.code === "auth/too-many-requests") {
        showError("Too many OTP requests. Please try again later.");
      } else if (error.code === "auth/captcha-check-failed") { // Specific error for reCAPTCHA failure
        showError("Security verification failed. Please try again.");
      } else if (error.code === "auth/code-expired") { // This might happen if recaptcha was very old
        showError("OTP session expired. Please request a new one.");
      }
      else {
        showError("Failed to send OTP. Please try again.");
      }
      // IMPORTANT: Clear the reCAPTCHA if OTP sending fails
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        console.log("RecaptchaVerifier cleared after failed OTP send for sign-in.");
      }
    }
    finally {
      setIsLoginLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      if (!otp) {
        showError("Please enter the OTP.");
        return;
      }

      if (!confirmationResult) {
        showError("No OTP session found. Please request OTP again.");
        return;
      }

      const success = await verifyOTPAndSignin(confirmationResult, otp);

      if (success) {
        showSuccess("You have successfully signed in!");
        navigate("/");
      }
    }
    catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.code === "auth/invalid-verification-code") {
        showError("Invalid OTP. Please check and try again.");
      } else if (error.code === "auth/code-expired") {
        showError("OTP has expired. Please request a new one.");
      } else {
        showError("An error occurred during sign in. Please try again.");
      }
    }
    finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <AuthPage>
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="flex flex-col min-h-screen justify-center mx-8">
        {/*
          This div with id="recaptcha-container" is used by RecaptchaVerifier.
          It must exist in the DOM for the RecaptchaVerifier to attach to.
        */}
        <div id="recaptcha-container"></div>

        {/* Back Arrow */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors duration-200"
          >
            <IoArrowBack className="text-2xl" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="md:hidden text-center mb-7">
          <div className="flex items-center justify-center gap-2">
            <GiHeartDrop className="h-10 w-10 text-red-700" />
            <h1 className="text-red-700 text-4xl font-bold">Blood Bond</h1>
          </div>
          <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
        </div>

        <div className="flex items-center justify-center bg-red-100">
          <Card className="py-10 px-8 mx-auto w-full max-w-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Enter the details to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone">Phone Number</label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isOtpSent}
                  />
                </div>

                {isOtpSent && (
                  <div className="space-y-2">
                    <label htmlFor="otp">Enter OTP</label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                    />
                    <p className="text-sm text-gray-500">
                      We've sent a 6-digit code to {phone}
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading
                    ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...")
                    : (isOtpSent ? "Verify OTP & Sign In" : "Send OTP")
                  }
                </Button>

                {isOtpSent && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtp("");
                      setConfirmationResult(null);
                      // Clear reCAPTCHA state if the user decides to change phone number
                      if (recaptchaVerifierRef.current) {
                        recaptchaVerifierRef.current.clear();
                        console.log("RecaptchaVerifier cleared on 'Change Phone Number' for sign-in.");
                      }
                    }}
                    disabled={isLoginLoading}
                  >
                    Change Phone Number
                  </Button>
                )}

                <div className="text-center text-sm space-y-2">
                  <div>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-red-600 hover:underline">
                      Sign up
                    </Link>
                  </div>
                  <div>
                    By signing in, you agree to our{" "}
                    <Link
                      to="/terms-and-conditions"
                      target="_blank"
                      className="text-red-600 hover:text-red-800 underline font-medium"
                    >
                      Terms and Conditions
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthPage>
  );
};

export default SignInPage;
