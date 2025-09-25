import React, { useState, useEffect, useRef } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, setupRecaptcha } from "../firebase";
import { toast } from 'react-toastify';

const OTPVerification = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  phoneNumber, 
  title = "Verify Phone Number" 
}) => {
  const [step, setStep] = useState(1); // 1: phone input, 2: OTP input
  const [phone, setPhone] = useState(phoneNumber || "");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const recaptchaRef = useRef(null);

  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    if (phoneNumber) {
      setPhone(phoneNumber);
      setStep(2);
      sendOTP(phoneNumber);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log("Cleaning up reCAPTCHA");
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // Ensure reCAPTCHA container is ready when component mounts
  useEffect(() => {
    if (isOpen && step === 1) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        const container = document.getElementById("recaptcha-container");
        if (container) {
          console.log("reCAPTCHA container is ready");
        } else {
          console.log("reCAPTCHA container not found, will create dynamically");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  const sendOTP = async (phoneNum) => {
    setIsLoading(true);
    try {
      // Clear any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log("Clearing existing reCAPTCHA");
        }
        window.recaptchaVerifier = null;
      }

      // Wait a bit for cleanup
      await new Promise(resolve => setTimeout(resolve, 200));

      const verifier = setupRecaptcha();
      const phoneWithCountryCode = `+91${phoneNum}`;
      const result = await signInWithPhoneNumber(auth, phoneWithCountryCode, verifier);
      setConfirmation(result);
      setStep(2);
      setResendTimer(30);
      setIsResendDisabled(true);
      toast.success("OTP sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!confirmation) return;

    setIsLoading(true);
    try {
      await confirmation.confirm(otp);
      toast.success("Phone number verified successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        toast.error("Too many failed attempts. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
        });
        handleClose();
      } else {
        toast.error(`Invalid OTP. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setAttempts(0);
    setOtp("");
    sendOTP(phone);
  };

  const handleClose = () => {
    // Clean up reCAPTCHA
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.log("Cleaning up reCAPTCHA on close");
      }
      window.recaptchaVerifier = null;
    }

    // Remove reCAPTCHA container
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.remove();
    }

    setStep(1);
    setPhone("");
    setOtp("");
    setConfirmation(null);
    setAttempts(0);
    setIsResendDisabled(false);
    setResendTimer(0);
    onClose();
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      sendOTP(phone);
    } else {
      toast.error("Please enter a valid 10-digit phone number", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  maxLength="10"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter your 10-digit mobile number
              </p>
            </div>


            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || phone.length !== 10}
                className={`flex-1 px-4 py-2 rounded-md text-white font-medium ${
                  isLoading || phone.length !== 10
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                } focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength="6"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the 6-digit code sent to +91{phone}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleResend}
                disabled={isResendDisabled}
                className={`text-sm ${
                  isResendDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-600 hover:text-red-700'
                }`}
              >
                {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </button>
              <span className="text-xs text-gray-500">
                {MAX_ATTEMPTS - attempts} attempts remaining
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                onClick={verifyOTP}
                disabled={isLoading || otp.length !== 6}
                className={`flex-1 px-4 py-2 rounded-md text-white font-medium ${
                  isLoading || otp.length !== 6
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                } focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;