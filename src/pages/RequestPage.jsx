import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestPage = () => {
    const [matchedDonors, setMatchedDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const bloodGroups = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    ];

    const initialValues = {
        bloodGroup: "",
        pincode: ""
    };

    const validationSchema = Yup.object().shape({
        bloodGroup: Yup.string()
            .required("Blood group is required"),
        pincode: Yup.string()
            .required("Pincode is required")
            .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const storedDonors = localStorage.getItem('donor');
            if (!storedDonors) {
                toast.error('No donors found in the database', {
                    position: "top-right",
                    autoClose: 5000,
                });
                return;
            }

            const allDonors = JSON.parse(storedDonors);
            const filteredDonors = allDonors.filter(donor => 
                donor.bloodGroup === values.bloodGroup && 
                donor.pincode === values.pincode
            );

            if (filteredDonors.length === 0) {
                toast.info('No donors found matching your criteria', {
                    position: "top-right",
                    autoClose: 5000,
                });
            } else {
                toast.success(`Found ${filteredDonors.length} donor(s)`, {
                    position: "top-right",
                    autoClose: 5000,
                });
                setShowResults(true);
            }

            setMatchedDonors(filteredDonors);
        } catch (error) {
            console.error("Error finding donors:", error);
            toast.error('Error searching for donors. Please try again.', {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const handleBackToSearch = () => {
        setShowResults(false);
    };

    return (
        <div className="min-h-[calc(100vh-14rem)] lg:min-h-[calc(100vh-12rem)] bg-red-200 flex items-center">
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
            <div className="container mx-auto px-4 py-8 lg:py-8">
                {!showResults ? (
                    <div className="max-w-md mx-auto">
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-600 text-center mb-6">
                                Find a Blood Donor
                            </h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched, isSubmitting }) => (
                                    <Form className="space-y-4">
                                        <div>
                                            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                                                Blood Group
                                            </label>
                                            <Field
                                                as="select"
                                                name="bloodGroup"
                                                className={`mt-1 block w-full px-3 py-2 border ${
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
                                                <div className="text-red-500 text-sm mt-1">{errors.bloodGroup}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                                Pincode
                                            </label>
                                            <Field
                                                name="pincode"
                                                type="text"
                                                maxLength="6"
                                                className={`mt-1 block w-full px-3 py-2 border ${
                                                    errors.pincode && touched.pincode ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                            />
                                            {errors.pincode && touched.pincode && (
                                                <div className="text-red-500 text-sm mt-1">{errors.pincode}</div>
                                            )}
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || isLoading}
                                                className={`w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-white font-medium ${
                                                    isSubmitting || isLoading
                                                        ? 'bg-red-400 cursor-not-allowed'
                                                        : 'bg-red-600 hover:bg-red-700'
                                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Searching...
                                                    </div>
                                                ) : (
                                                    'Find Donor'
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-red-600">Matching Donors</h2>
                                <button
                                    onClick={handleBackToSearch}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {matchedDonors.map((donor) => (
                                    <div key={donor.id} className="bg-red-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-red-600">{donor.fullName}</h3>
                                            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                                {donor.bloodGroup}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="break-words">{donor.city}, {donor.district}, {donor.state}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>{donor.contact}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>Pincode: {donor.pincode}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                Registered on: {new Date(donor.registrationDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestPage;