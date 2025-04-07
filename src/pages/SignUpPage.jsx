import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";

const SignUpPage = () => {
    const initialValues = {
        fullName: '',
        phone: '',
        dob: '',
        bloodType: '',
        gender: '',
        email: '',
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full name is required')
            .min(3, 'Full name must be at least 3 characters'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
        dob: Yup.date()
            .required('Date of birth is required')
            .max(new Date(), 'Date of birth cannot be in the future'),
        bloodType: Yup.string()
            .required('Blood type is required'),
        gender: Yup.string()
            .required('Gender is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Form values:', values);
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <div className="bg-red-600 text-white py-6 rounded-t-lg">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold">Welcome to
                            <span className="text-white ml-2">Blood Bond</span>
                        </h3>
                        <p className="text-red-100 mt-2">Join our blood donation community</p>
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <Field
                                                as={Input}
                                                id="fullName"
                                                name="fullName"
                                                placeholder="John Doe"
                                                className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                                            />
                                            {errors.fullName && touched.fullName && (
                                                <div className="text-red-500 text-sm">{errors.fullName}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact No.</label>
                                            <Field
                                                as={Input}
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="1234567890"
                                                className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                                            />
                                            {errors.phone && touched.phone && (
                                                <div className="text-red-500 text-sm">{errors.phone}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                            <Field
                                                as={Input}
                                                id="dob"
                                                name="dob"
                                                type="date"
                                                className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                                            />
                                            {errors.dob && touched.dob && (
                                                <div className="text-red-500 text-sm">{errors.dob}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
                                            <Field name="bloodType">
                                                {({ field, form }) => (
                                                    <Select
                                                        onValueChange={(value) => form.setFieldValue('bloodType', value)}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
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
                                                )}
                                            </Field>
                                            {errors.bloodType && touched.bloodType && (
                                                <div className="text-red-500 text-sm">{errors.bloodType}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                                            <div className="flex flex-col space-y-2">
                                                <label className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="male"
                                                        className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Male</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="female"
                                                        className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Female</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="other"
                                                        className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Other</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="prefer-not-to-say"
                                                        className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Prefer not to say</span>
                                                </label>
                                            </div>
                                            {errors.gender && touched.gender && (
                                                <div className="text-red-500 text-sm">{errors.gender}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                                            />
                                            {errors.email && touched.email && (
                                                <div className="text-red-500 text-sm">{errors.email}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 bg-gray-50 rounded-b-lg">
                                <Button
                                    type="submit"
                                    className="w-full max-w-xs mx-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating account..." : "Sign Up"}
                                </Button>
                            </CardFooter>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default SignUpPage;