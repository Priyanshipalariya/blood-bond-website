import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerification from '../components/OTPVerification';

const RegisterPage = () => {
    const [locationDetails, setLocationDetails] = useState({
        state: "",
        district: "",
        city: ""
    });
    const [debouncedPincode, setDebouncedPincode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pincodeError, setPincodeError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [pendingFormData, setPendingFormData] = useState(null);

    const bloodGroups = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    ];

    // Debounce pincode lookup
    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedPincode.length === 6) {
                fetchAreaFromPincode(debouncedPincode);
            } else {
                setLocationDetails({
                    state: "",
                    district: "",
                    city: ""
                });
                setPincodeError("");
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [debouncedPincode]);

    const fetchAreaFromPincode = async (pincode) => {
        setIsLoading(true);
        setPincodeError("");
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            if (data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];
                setLocationDetails({
                    state: postOffice.State,
                    district: postOffice.District,
                    city: postOffice.Name
                });
                setPincodeError("");
            } else {
                setLocationDetails({
                    state: "",
                    district: "",
                    city: ""
                });
                setPincodeError("Pincode not found");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            setLocationDetails({
                state: "",
                district: "",
                city: ""
            });
            setPincodeError("Error fetching pincode details");
        } finally {
            setIsLoading(false);
        }
    };

    const initialValues = {
        fullName: "",
        contact: "",
        bloodGroup: "",
        pincode: ""
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Full name is required")
            .min(3, "Name must be at least 3 characters")
            .max(25, "Name cannot exceed 25 characters")
            .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
        contact: Yup.string()
            .required("Contact number is required")
            .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
            .test('is-valid-phone', 'Please enter a valid phone number', value => {
                if (!value) return true;
                return /^[6-9]\d{9}$/.test(value);
            }),
        bloodGroup: Yup.string()
            .required("Blood group is required"),
        pincode: Yup.string()
            .required("Pincode is required")
            .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
    });

    const checkPhoneNumberExists = (phoneNumber) => {
        try {
            const storedDonors = localStorage.getItem('donor');
            if (storedDonors) {
                const existingDonors = JSON.parse(storedDonors);
                return existingDonors.some(donor => donor.contact === phoneNumber);
            }
            return false;
        } catch (error) {
            console.error("Error checking phone number:", error);
            return false;
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        setIsSubmitting(true);
        try {
            // Check if phone number already exists
            if (checkPhoneNumberExists(values.contact)) {
                setFieldError('contact', 'This phone number is already registered as a donor. Please try another number.');
                toast.error('This phone number is already registered as a donor. Please try another number.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            // Store form data and show OTP modal
            const formData = {
                ...values,
                ...locationDetails,
                id: Date.now(),
                registrationDate: new Date().toISOString()
            };
            
            setPendingFormData(formData);
            setShowOTPVerification(true);
            
        } catch (error) {
            console.error("Error preparing registration:", error);
            toast.error('Error preparing registration. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    const handleOTPSuccess = () => {
        try {
            // Get existing donors from localStorage
            const storedDonors = localStorage.getItem('donor');
            const existingDonors = storedDonors ? JSON.parse(storedDonors) : [];
            
            // Add new donor to the array
            const updatedDonors = [...existingDonors, pendingFormData];
            
            // Save updated array to localStorage
            localStorage.setItem('donor', JSON.stringify(updatedDonors));
            
            // Show success message
            toast.success('Registration successful! Your phone number has been verified.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Close modal and reset pending data
            setShowOTPVerification(false);
            setPendingFormData(null);
            
            // Reset form and location details
            setLocationDetails({
                state: "",
                district: "",
                city: ""
            });
            setPincodeError("");
            
            // Redirect to homepage after success
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            console.error("Error saving donor details:", error);
            toast.error('Error saving registration details. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleOTPClose = () => {
        setShowOTPVerification(false);
        setPendingFormData(null);
    };

    return (
        <div className="min-h-[calc(100vh-14rem)] lg:min-h-[calc(100vh-12rem)] bg-red-200 flex items-center justify-center py-4 sm:py-8 md:py-12 px-2 sm:px-4 lg:px-8">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-4 sm:space-y-6 md:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-2 sm:mt-4 md:mt-6 text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-red-600">
                        Register as a Blood Donor
                    </h2>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, setFieldValue, isValid }) => (
                        <Form className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-6">
                            <div className="rounded-md space-y-3 sm:space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <Field
                                        name="fullName"
                                        type="text"
                                        maxLength="25"
                                        className={`mt-1 block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border ${
                                            errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.fullName && touched.fullName ? (
                                            <div className="text-red-500 text-xs sm:text-sm">{errors.fullName}</div>
                                        ) : (
                                            <div className="text-gray-500 text-xs sm:text-sm">
                                                {values.fullName.length}/25 characters
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <Field
                                        name="contact"
                                        type="tel"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className={`mt-1 block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border ${
                                            errors.contact && touched.contact ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                    />
                                    {errors.contact && touched.contact && (
                                        <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.contact}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="bloodGroup" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Blood Group
                                    </label>
                                    <Field
                                        as="select"
                                        name="bloodGroup"
                                        className={`mt-1 block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border ${
                                            errors.bloodGroup && touched.bloodGroup ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map((group) => (
                                            <option key={group} value={group}>
                                                {group}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.bloodGroup && touched.bloodGroup && (
                                        <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.bloodGroup}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="pincode" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Pincode
                                    </label>
                                    <div className="relative">
                                        <Field
                                            name="pincode"
                                            type="text"
                                            maxLength="6"
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                setFieldValue("pincode", value);
                                                setDebouncedPincode(value);
                                            }}
                                            className={`mt-1 block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border ${
                                                (errors.pincode && touched.pincode) || pincodeError ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                        />
                                        {isLoading && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.pincode && touched.pincode && (
                                        <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.pincode}</div>
                                    )}
                                    {pincodeError && (
                                        <div className="text-red-500 text-xs sm:text-sm mt-1">{pincodeError}</div>
                                    )}
                                    {locationDetails.state && !pincodeError && (
                                        <div className="mt-2 space-y-1 sm:space-y-2">
                                            <div className="text-green-600 text-xs sm:text-sm">
                                                State: {locationDetails.state}
                                            </div>
                                            <div className="text-green-600 text-xs sm:text-sm">
                                                District: {locationDetails.district}
                                            </div>
                                            <div className="text-green-600 text-xs sm:text-sm">
                                                Area: {locationDetails.city}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid || pincodeError || isLoading || !locationDetails.state}
                                    className={`w-full flex justify-center py-1.5 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm md:text-base font-medium text-white ${
                                        isSubmitting || !isValid || pincodeError || isLoading || !locationDetails.state
                                            ? 'bg-red-400 cursor-not-allowed'
                                            : 'bg-red-600 hover:bg-red-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Registering...
                                        </div>
                                    ) : (
                                        'Register'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            
            <OTPVerification
                isOpen={showOTPVerification}
                onClose={handleOTPClose}
                onSuccess={handleOTPSuccess}
                phoneNumber={pendingFormData?.contact}
                title="Verify Your Phone Number"
            />
        </div>
    );
};

export default RegisterPage;