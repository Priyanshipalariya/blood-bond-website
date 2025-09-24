// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
// import { Checkbox } from "../components/Checkbox";
// import { GiHeartDrop } from "react-icons/gi";
// import { IoArrowBack } from "react-icons/io5";
// import { useAuth } from "../Context/AuthContext";
// import { isTCAccepted } from "../utils/tcUtils";
// import useToast from "../hooks/useToast";
// import Toast from "../components/Toast";
// import AuthPage from "./AuthPage";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";


// const SignUpPage = () => {

//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     phone: "",
//     dob: "",
//     bloodType: "",
//     agreeToTerms: false,
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     // This will only run once when the component mounts
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'invisible',
//       'callback': (response) => {
//         console.log("reCAPTCHA solved, ready to send OTP.");
//       }
//     });
//   }, []);

//   const [otp, setOtp] = useState("");
//   const [isSignupLoading, setIsSignupLoading] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [tcAccepted, setTcAccepted] = useState(false);

//   const navigate = useNavigate();
//   const { sendOTP, verifyOTPAndSignup } = useAuth();
//   const { toasts, removeToast, showSuccess, showError, showWarning } = useToast();

//   // Check T&C acceptance status on component mount
//   useEffect(() => {
//     const accepted = isTCAccepted();
//     setTcAccepted(accepted);
//   }, []);



//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBloodTypeChange = (value) => {
//     setSignupData((prev) => ({ ...prev, bloodType: value }));
//   };

//   const handleCheckboxChange = (checked) => {
//     setSignupData((prev) => ({ ...prev, agreeToTerms: checked }));
//   };

//   // Reset form when terms are not accepted
//   const resetForm = () => {
//     setSignupData({
//       fullName: "",
//       phone: "",
//       dob: "",
//       bloodType: "",
//       agreeToTerms: false,
//     });
//     setOtp("");
//     setIsOtpSent(false);
//     setConfirmationResult(null);
//   };

//   const handleSendOTP = async (e) => {
//     e.preventDefault();

//     if (!signupData.phone) {
//       showError("Please enter your phone number.");
//       return;
//     }

//     if (!signupData.agreeToTerms) {
//       showWarning("You must agree to the terms and conditions.");
//       return;
//     }

//     setIsSignupLoading(true);

//     try {
//       const verifier = window.recaptchaVerifier;
      
//       const result = await sendOTP(signupData.phone, verifier);
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
//       setIsSignupLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();

//     if (!otp) {
//       showError("Please enter the OTP.");
//       return;
//     }

//     if (!confirmationResult) {
//       showError("No OTP session found. Please request OTP again.");
//       return;
//     }

//     setIsSignupLoading(true);

//     try {
//       const success = await verifyOTPAndSignup(confirmationResult, otp, {
//         fullName: signupData.fullName,
//         phone: signupData.phone,
//         dob: signupData.dob,
//         bloodType: signupData.bloodType,
//         displayName: signupData.fullName
//       });

//       if (success) {
//         showSuccess("You have successfully created an account!");
//         navigate("/");
//       }
//     }
//     catch (error) {
//       if (error.message === "Phone number already exists") {
//         showError("This phone number is already registered. Please use a different phone number.");
//       } else if (error.message === "Failed to create user profile") {
//         showError("Account created but failed to save profile. Please try again.");
//       } else if (error.code === "auth/invalid-verification-code") {
//         showError("Invalid OTP. Please check and try again.");
//       } else if (error.code === "auth/code-expired") {
//         showError("OTP has expired. Please request a new one.");
//       } else {
//         showError("An error occurred during sign up. Please try again.");
//       }
//     }
//     finally {
//       setIsSignupLoading(false);
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
      
//       <div className="flex flex-col min-h-screen justify-center mx-8 py-10">
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
//             <h1 className="text-red-700 text-4xl font-bold"> Blood Bond</h1>
//           </div>
//           <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
//         </div>

//         <div className="flex items-center justify-center bg-red-100">
//           <Card className="py-10 px-8 md:px-4 bg-white w-full max-w-lg mx-auto">

//             <CardHeader>
//               <CardTitle className="text-2xl text-center">Welcome</CardTitle>
//               <CardDescription className="text-gray-500 text-center">
//                 Join our blood donation community
//               </CardDescription>
//             </CardHeader>
//             <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="fullName">Full Name</label>
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     placeholder="John Doe"
//                     value={signupData.fullName}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="phone">Contact Number</label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="+1234567890"
//                     value={signupData.phone}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="dob">Date of Birth</label>
//                   <Input
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     placeholder="DD-MM-YYYY"
//                     value={signupData.dob}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="bloodType">Blood Type</label>
//                   <Select onValueChange={handleBloodTypeChange} value={signupData.bloodType}>
//                     <SelectTrigger disabled={isOtpSent}>
//                       <SelectValue placeholder="Select your blood type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="A+">A+</SelectItem>
//                       <SelectItem value="A-">A-</SelectItem>
//                       <SelectItem value="B+">B+</SelectItem>
//                       <SelectItem value="B-">B-</SelectItem>
//                       <SelectItem value="AB+">AB+</SelectItem>
//                       <SelectItem value="AB-">AB-</SelectItem>
//                       <SelectItem value="O+">O+</SelectItem>
//                       <SelectItem value="O-">O-</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {isOtpSent && (
//                   <div className="space-y-2">
//                     <label htmlFor="otp">Enter OTP</label>
//                     <Input
//                       id="otp"
//                       name="otp"
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                       maxLength="6"
//                     />
//                     <p className="text-sm text-gray-500">
//                       We've sent a 6-digit code to {signupData.phone}
//                     </p>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="terms"
//                       checked={signupData.agreeToTerms}
//                       onCheckedChange={handleCheckboxChange}
//                     />
//                     <label htmlFor="terms" className="text-sm font-normal">
//                       I agree to the{" "}
//                       <Link 
//                         to="/terms-and-conditions" 
//                         target="_blank"
//                         className="text-red-600 hover:text-red-800 underline font-medium"
//                       >
//                         Terms and Conditions
//                       </Link>
//                     </label>
//                   </div>
                  
//                   {tcAccepted && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                       <p className="text-sm text-green-700">
//                         ✅ Terms and Conditions have been accepted
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex flex-col space-y-2">
//                 <Button
//                   type="submit"
//                   className="w-full bg-blood hover:bg-blood-dark"
//                   disabled={isSignupLoading}
//                 >
//                   {isSignupLoading 
//                     ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...") 
//                     : (isOtpSent ? "Verify OTP & Create Account" : "Send OTP")
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
//                     disabled={isSignupLoading}
//                   >
//                     Change Phone Number
//                   </Button>
//                 )}
                
//                 <div className="text-center text-sm mt-2">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-red-600 hover:underline">
//                     Sign In
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </AuthPage>
//   );
// };

// export default SignUpPage;


// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Use react-router-dom for Link, useNavigate
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
// import { Checkbox } from "../components/Checkbox";
// import { GiHeartDrop } from "react-icons/gi";
// import { IoArrowBack } from "react-icons/io5";
// import { useAuth } from "../Context/AuthContext";
// import { isTCAccepted } from "../utils/tcUtils";
// import useToast from "../hooks/useToast";
// import Toast from "../components/Toast";
// import AuthPage from "./AuthPage";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// const SignUpPage = () => {

//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     phone: "",
//     dob: "",
//     bloodType: "",
//     agreeToTerms: false,
//   });

//   // Use useRef to store the RecaptchaVerifier instance
//   const recaptchaVerifierRef = useRef(null);

//   useEffect(() => {
//     const auth = getAuth();
    
//     // Initialize RecaptchaVerifier for invisible reCAPTCHA
//     recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'invisible', // This makes it invisible
//       'callback': (response) => {
//         // This callback is generally for debugging or if you're manually verifying.
//         // For signInWithPhoneNumber, the reCAPTCHA resolution is handled internally.
//         console.log("reCAPTCHA invisible challenge resolved or auto-verified.");
//       },
//       'expired-callback': () => {
//         console.log("reCAPTCHA response expired. User might need to try again.");
//         // Optionally clear reCAPTCHA if it expires.
//         if (recaptchaVerifierRef.current) {
//           recaptchaVerifierRef.current.clear();
//         }
//         showWarning("Security check expired. Please try sending OTP again.");
//       },
//       'error-callback': (error) => {
//         console.error("reCAPTCHA error:", error);
//         showError("Security check failed to load. Please refresh and try again.");
//       }
//     });

//     // Render the reCAPTCHA. For invisible, this often just sets up the backend mechanism
//     // and might display a small badge in the corner of the screen.
//     recaptchaVerifierRef.current.render().then(() => {
//       console.log("reCAPTCHA widget rendered (invisible).");
//     }).catch(error => {
//       console.error("Error rendering reCAPTCHA:", error);
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

//   const [otp, setOtp] = useState("");
//   const [isSignupLoading, setIsSignupLoading] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null); // No specific type for JS
//   const [tcAccepted, setTcAccepted] = useState(false);

//   const navigate = useNavigate();
//   const { sendOTP, verifyOTPAndSignup } = useAuth();
//   const { toasts, removeToast, showSuccess, showError, showWarning } = useToast();

//   // Check T&C acceptance status on component mount
//   useEffect(() => {
//     const accepted = isTCAccepted();
//     setTcAccepted(accepted);
//   }, []);

//   const handleSignupChange = (e) => { // Removed type annotation
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBloodTypeChange = (value) => { // Removed type annotation
//     setSignupData((prev) => ({ ...prev, bloodType: value }));
//   };

//   const handleCheckboxChange = (checked) => { // Removed type annotation
//     setSignupData((prev) => ({ ...prev, agreeToTerms: checked }));
//   };

//   // Reset form when terms are not accepted (or other reasons)
//   const resetForm = () => {
//     setSignupData({
//       fullName: "",
//       phone: "",
//       dob: "",
//       bloodType: "",
//       agreeToTerms: false,
//     });
//     setOtp("");
//     setIsOtpSent(false);
//     setConfirmationResult(null);
//     // Clear reCAPTCHA state on form reset
//     if (recaptchaVerifierRef.current) {
//       recaptchaVerifierRef.current.clear();
//     }
//   };

//   const handleSendOTP = async (e) => { // Removed type annotation
//     e.preventDefault();

//     if (!signupData.phone) {
//       showError("Please enter your phone number.");
//       return;
//     }

//     if (!signupData.agreeToTerms) {
//       showWarning("You must agree to the terms and conditions.");
//       return;
//     }

//     // Ensure reCAPTCHA verifier is loaded before attempting to send OTP
//     if (!recaptchaVerifierRef.current) {
//       showError("Security verification is not ready. Please refresh the page.");
//       return;
//     }

//     setIsSignupLoading(true);

//     try {
//       // Pass the reCAPTCHA verifier instance to your sendOTP function
//       const result = await sendOTP(signupData.phone, recaptchaVerifierRef.current);
//       setConfirmationResult(result);
//       setIsOtpSent(true);
//       showSuccess("OTP sent successfully to your phone number!");
//     }
//     catch (error) { // Removed type annotation
//       console.error("Error sending OTP:", error);
//       if (error.code === "auth/invalid-phone-number") {
//         showError("Invalid phone number format. Please enter a valid phone number (e.g., +1234567890).");
//       } else if (error.code === "auth/too-many-requests") {
//         showError("Too many OTP requests. Please try again later.");
//       } else if (error.code === "auth/captcha-check-failed") {
//         showError("Security verification failed. Please try again.");
//       } else if (error.code === "auth/code-expired") {
//         showError("OTP has expired. Please request a new one.");
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
//       setIsSignupLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => { // Removed type annotation
//     e.preventDefault();

//     if (!otp) {
//       showError("Please enter the OTP.");
//       return;
//     }

//     if (!confirmationResult) {
//       showError("No OTP session found. Please request OTP again.");
//       return;
//     }

//     setIsSignupLoading(true);

//     try {
//       const success = await verifyOTPAndSignup(confirmationResult, otp, {
//         fullName: signupData.fullName,
//         phone: signupData.phone,
//         dob: signupData.dob,
//         bloodType: signupData.bloodType,
//         displayName: signupData.fullName
//       });

//       if (success) {
//         showSuccess("You have successfully created an account!");
//         navigate("/");
//       }
//     }
//     catch (error) { // Removed type annotation
//       console.error("Error verifying OTP:", error);
//       if (error.message === "Phone number already exists") {
//         showError("This phone number is already registered. Please use a different phone number.");
//       } else if (error.message === "Failed to create user profile") {
//         showError("Account created but failed to save profile. Please try again.");
//       } else if (error.code === "auth/invalid-verification-code") {
//         showError("Invalid OTP. Please check and try again.");
//       } else if (error.code === "auth/code-expired") {
//         showError("OTP has expired. Please request a new one.");
//       } else {
//         showError("An error occurred during sign up. Please try again.");
//       }
//       // Optionally clear reCAPTCHA here too if you want to force a re-challenge
//       // after failed OTP verification attempts, though it's less common.
//     }
//     finally {
//       setIsSignupLoading(false);
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
      
//       <div className="flex flex-col min-h-screen justify-center mx-8 py-10">
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
//             <h1 className="text-red-700 text-4xl font-bold"> Blood Bond</h1>
//           </div>
//           <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
//         </div>

//         <div className="flex items-center justify-center bg-red-100">
//           <Card className="py-10 px-8 md:px-4 bg-white w-full max-w-lg mx-auto">

//             <CardHeader>
//               <CardTitle className="text-2xl text-center">Welcome</CardTitle>
//               <CardDescription className="text-gray-500 text-center">
//                 Join our blood donation community
//               </CardDescription>
//             </CardHeader>
//             <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="fullName">Full Name</label>
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     placeholder="John Doe"
//                     value={signupData.fullName}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="phone">Contact Number</label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="+1234567890" // Example E.164 format
//                     value={signupData.phone}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="dob">Date of Birth</label>
//                   <Input
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     placeholder="DD-MM-YYYY"
//                     value={signupData.dob}
//                     onChange={handleSignupChange}
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="bloodType">Blood Type</label>
//                   <Select onValueChange={handleBloodTypeChange} value={signupData.bloodType}>
//                     <SelectTrigger disabled={isOtpSent}>
//                       <SelectValue placeholder="Select your blood type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="A+">A+</SelectItem>
//                       <SelectItem value="A-">A-</SelectItem>
//                       <SelectItem value="B+">B+</SelectItem>
//                       <SelectItem value="B-">B-</SelectItem>
//                       <SelectItem value="AB+">AB+</SelectItem>
//                       <SelectItem value="AB-">AB-</SelectItem>
//                       <SelectItem value="O+">O+</SelectItem>
//                       <SelectItem value="O-">O-</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {isOtpSent && (
//                   <div className="space-y-2">
//                     <label htmlFor="otp">Enter OTP</label>
//                     <Input
//                       id="otp"
//                       name="otp"
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                       maxLength="6"
//                     />
//                     <p className="text-sm text-gray-500">
//                       We've sent a 6-digit code to {signupData.phone}
//                     </p>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="terms"
//                       checked={signupData.agreeToTerms}
//                       onCheckedChange={handleCheckboxChange}
//                     />
//                     <label htmlFor="terms" className="text-sm font-normal">
//                       I agree to the{" "}
//                       <Link 
//                         to="/terms-and-conditions" 
//                         target="_blank"
//                         className="text-red-600 hover:text-red-800 underline font-medium"
//                       >
//                         Terms and Conditions
//                       </Link>
//                     </label>
//                   </div>
                  
//                   {tcAccepted && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                       <p className="text-sm text-green-700">
//                         ✅ Terms and Conditions have been accepted
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex flex-col space-y-2">
//                 <Button
//                   type="submit"
//                   className="w-full bg-blood hover:bg-blood-dark"
//                   disabled={isSignupLoading}
//                 >
//                   {isSignupLoading 
//                     ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...") 
//                     : (isOtpSent ? "Verify OTP & Create Account" : "Send OTP")
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
//                     disabled={isSignupLoading}
//                   >
//                     Change Phone Number
//                   </Button>
//                 )}
                
//                 <div className="text-center text-sm mt-2">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-red-600 hover:underline">
//                     Sign In
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </AuthPage>
//   );
// };

// export default SignUpPage;

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrected import
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
import { Checkbox } from "../components/Checkbox";
import { GiHeartDrop } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../Context/AuthContext";
import { isTCAccepted } from "../utils/tcUtils";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";
import AuthPage from "./AuthPage";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    bloodType: "",
    agreeToTerms: false,
  });

  // Use useRef to store the RecaptchaVerifier instance
  const recaptchaVerifierRef = useRef(null);

  const navigate = useNavigate();
  const { toasts, removeToast, showSuccess, showError, showWarning } = useToast();
  const { sendOTP, verifyOTPAndSignup } = useAuth();

  useEffect(() => {
    const auth = getAuth();
    
    // Only create a new RecaptchaVerifier if one doesn't exist
    // and if the container element is available in the DOM.
    if (!recaptchaVerifierRef.current && document.getElementById('recaptcha-container')) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible', // This makes it invisible
            'callback': (response) => {
                // This callback fires when the reCAPTCHA challenge is implicitly solved.
                console.log("reCAPTCHA invisible challenge resolved or auto-verified.");
                // You don't usually need to do anything here for invisible reCAPTCHA
                // as the challenge is resolved before signInWithPhoneNumber proceeds.
            },
            'expired-callback': () => {
                console.log("reCAPTCHA response expired. User might need to try again.");
                if (recaptchaVerifierRef.current) {
                    recaptchaVerifierRef.current.clear();
                }
                showWarning("Security check expired. Please try sending OTP again.");
            },
            'error-callback': (error) => {
                console.error("reCAPTCHA error:", error);
                showError("Security check failed. Please refresh and try again.");
            }
        });

        // For invisible reCAPTCHA, we DO NOT explicitly call .render() here.
        // Firebase will handle rendering when signInWithPhoneNumber is called
        // with this verifier instance.
        console.log("RecaptchaVerifier instance created (invisible).");
    }

    // Cleanup function for useEffect to clear reCAPTCHA on component unmount
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
        console.log("RecaptchaVerifier instance cleared on unmount.");
      }
    };
    // Dependency array: Ensure useEffect re-runs if auth instance changes or toast functions are unstable
  }, [showError, showWarning]);

  const [otp, setOtp] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null); 
  const [tcAccepted, setTcAccepted] = useState(false);

  // Check T&C acceptance status on component mount
  useEffect(() => {
    const accepted = isTCAccepted();
    setTcAccepted(accepted);
  }, []);

  const handleSignupChange = (e) => { 
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBloodTypeChange = (value) => { 
    setSignupData((prev) => ({ ...prev, bloodType: value }));
  };

  const handleCheckboxChange = (checked) => { 
    setSignupData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  // Reset form when terms are not accepted (or other reasons)
  const resetForm = () => {
    setSignupData({
      fullName: "",
      phone: "",
      dob: "",
      bloodType: "",
      agreeToTerms: false,
    });
    setOtp("");
    setIsOtpSent(false);
    setConfirmationResult(null);
    // Clear reCAPTCHA state on form reset
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      console.log("RecaptchaVerifier instance cleared on form reset.");
    }
  };

  const handleSendOTP = async (e) => { 
    e.preventDefault();

    if (!signupData.phone) {
      showError("Please enter your phone number.");
      return;
    }

    if (!signupData.agreeToTerms) {
      showWarning("You must agree to the terms and conditions.");
      return;
    }

    // Ensure reCAPTCHA verifier is loaded before attempting to send OTP
    if (!recaptchaVerifierRef.current) {
      showError("Security verification is not ready. Please refresh the page.");
      return;
    }

    setIsSignupLoading(true);

    try {
      // Pass the reCAPTCHA verifier instance to your sendOTP function
      const result = await sendOTP(signupData.phone, recaptchaVerifierRef.current);
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
      } else if (error.code === "auth/captcha-check-failed") {
        showError("Security verification failed. Please try again.");
      } else if (error.code === "auth/code-expired") {
        showError("OTP has expired. Please request a new one.");
      }
      else {
        showError("Failed to send OTP. Please try again.");
      }
      // IMPORTANT: Clear the reCAPTCHA if OTP sending fails
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        console.log("RecaptchaVerifier instance cleared after failed OTP send.");
      }
    }
    finally {
      setIsSignupLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => { 
    e.preventDefault();

    if (!otp) {
      showError("Please enter the OTP.");
      return;
    }

    if (!confirmationResult) {
      showError("No OTP session found. Please request OTP again.");
      return;
    }

    setIsSignupLoading(true);

    try {
      const success = await verifyOTPAndSignup(confirmationResult, otp, {
        fullName: signupData.fullName,
        phone: signupData.phone,
        dob: signupData.dob,
        bloodType: signupData.bloodType,
        displayName: signupData.fullName
      });

      if (success) {
        showSuccess("You have successfully created an account!");
        navigate("/");
      }
    }
    catch (error) { 
      console.error("Error verifying OTP:", error);
      if (error.message === "Phone number already exists") {
        showError("This phone number is already registered. Please use a different phone number.");
      } else if (error.message === "Failed to create user profile") {
        showError("Account created but failed to save profile. Please try again.");
      } else if (error.code === "auth/invalid-verification-code") {
        showError("Invalid OTP. Please check and try again.");
      } else if (error.code === "auth/code-expired") {
        showError("OTP has expired. Please request a new one.");
      } else {
        showError("An error occurred during sign up. Please try again.");
      }
    }
    finally {
      setIsSignupLoading(false);
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
      
      <div className="flex flex-col min-h-screen justify-center mx-8 py-10">
        {/*
          This div with id="recaptcha-container" is used by RecaptchaVerifier.
          It must exist in the DOM for the RecaptchaVerifier to attach to.
          For invisible reCAPTCHA, it usually remains empty, but the reCAPTCHA API might
          still use it internally or for placing a badge (typically bottom-right).
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
            <h1 className="text-red-700 text-4xl font-bold"> Blood Bond</h1>
          </div>
          <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
        </div>

        <div className="flex items-center justify-center bg-red-100">
          <Card className="py-10 px-8 md:px-4 bg-white w-full max-w-lg mx-auto">

            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome</CardTitle>
              <CardDescription className="text-gray-500 text-center">
                Join our blood donation community
              </CardDescription>
            </CardHeader>
            <form onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName">Full Name</label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    required
                    disabled={isOtpSent}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone">Contact Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1234567890" // Example E.164 format
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    required
                    disabled={isOtpSent}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dob">Date of Birth</label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    placeholder="DD-MM-YYYY"
                    value={signupData.dob}
                    onChange={handleSignupChange}
                    required
                    disabled={isOtpSent}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bloodType">Blood Type</label>
                  <Select onValueChange={handleBloodTypeChange} value={signupData.bloodType}>
                    <SelectTrigger disabled={isOtpSent}>
                      <SelectValue placeholder="Select your blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isOtpSent && (
                  <div className="space-y-2">
                    <label htmlFor="otp">Enter OTP</label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                    />
                    <p className="text-sm text-gray-500">
                      We've sent a 6-digit code to {signupData.phone}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signupData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link 
                        to="/terms-and-conditions" 
                        target="_blank"
                        className="text-red-600 hover:text-red-800 underline font-medium"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                  
                  {tcAccepted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700">
                        ✅ Terms and Conditions have been accepted
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-blood hover:bg-blood-dark"
                  disabled={isSignupLoading}
                >
                  {isSignupLoading 
                    ? (isOtpSent ? "Verifying OTP..." : "Sending OTP...") 
                    : (isOtpSent ? "Verify OTP & Create Account" : "Send OTP")
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
                        console.log("RecaptchaVerifier instance cleared on 'Change Phone Number'.");
                      }
                    }}
                    disabled={isSignupLoading}
                  >
                    Change Phone Number
                  </Button>
                )}
                
                <div className="text-center text-sm mt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="text-red-600 hover:underline">
                    Sign In
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthPage>
  );
};

export default SignUpPage;
