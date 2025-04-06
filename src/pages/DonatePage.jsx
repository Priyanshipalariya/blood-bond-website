import { useState } from "react";
import { Button, ButtonLink } from "../components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/Input";
import { RadioGroup, RadioGroupItem } from "../components/Radio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
import { Checkbox } from "../components/Checkbox";
import { FaArrowCircleRight } from "react-icons/fa";
import { format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router";


const DonatePage = () => {

    const [date, setDate] = useState();

    const handleSubmit = (event) => {
        console.log('Form submitted')
    };

    return (
        <div className="bg-red-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Blood Donor</h1>
                        <p className="text-gray-600 text-lg mb-6">
                            Join thousands of donors who are saving lives every day. Complete the form below to register as a donor.
                        </p>

                        <Card className="bg-white">
                            <CardHeader className="px-6 pt-6">
                                <CardTitle>Donor Registration Form</CardTitle>
                                <CardDescription>
                                    Please provide accurate information to help us match you with donation opportunities.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Personal Information</h3>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="namw">Name</label>
                                                <Input id="name" placeholder="Enter your name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone">Phone Number</label>
                                                <Input id="phone" placeholder="Enter your phone number" required />
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="email">Email</label>
                                                <Input id="email" type="email" placeholder="Enter your email" required />
                                            </div>

                                            <div className="space-y-2 lg:space-y-5">
                                                <label>Gender</label>
                                                <RadioGroup defaultValue="male" className="space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="male" id="male" />
                                                        <label htmlFor="male">Male</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="female" id="female" />
                                                        <label htmlFor="female">Female</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="other" id="other" />
                                                        <label htmlFor="other">Other</label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="dob">Date of Birth</label>

                                                <button
                                                    className=" flex h-10 w-full rounded-md border border-gray-400  px-3 py-2  items-center justify-start text-left text-gray-500 "
                                                >

                                                    <CiCalendarDate className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : "Select your date of birth"}
                                                </button>

                                            </div>

                                            <div className="space-y-2">
                                                <label>Blood Type</label>
                                                <Select>
                                                    <SelectTrigger>
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
                                                        <SelectItem value="unknown">I don't know</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>



                                        </div>


                                    </div>

                                    <hr className="text-gray-400" />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Address Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="city">City</label>
                                                <Input id="city" placeholder="City" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="state">State/Province</label>
                                                <Input id="state" placeholder="State" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="zip">Zip/Postal Code</label>
                                                <Input id="zip" placeholder="Zip Code" required />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="text-gray-400" />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Health Information</h3>

                                        <div className="space-y-2">
                                            <label>Have you donated blood before?</label>
                                            <RadioGroup defaultValue="no" className="flex space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="yes" id="donated-yes" />
                                                    <label htmlFor="donated-yes">Yes</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no" id="donated-no" />
                                                    <label htmlFor="donated-no">No</label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="terms" required />
                                                <label htmlFor="terms" className="text-sm">
                                                    I confirm that I'm at least 17 years old, weigh at least 110 pounds, and am in good health.
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="consent" required />
                                                <label htmlFor="consent" className="text-sm">
                                                    I consent to being contacted by Blood Bond for donation opportunities.
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Register as Donor
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Requirements</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-700">Be at least 17 years old (16 with parental consent in some states)</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-700">Weigh at least 110 pounds</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-700">Be in good general health and feeling well</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiAlertCircle className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-medium text-blue-800">Important Note</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Wait at least 56 days between whole blood donations. You can donate platelets more frequently.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="font-medium text-gray-900 mb-2">Donation Process Takes:</h4>
                            <p className="text-gray-700 mb-4">About 1 hour from registration to refreshments</p>

                            <div className="border-t pt-4 mb-4">
                                <p className="text-sm text-gray-500">
                                    For specific medical conditions or medications that might affect your eligibility, please consult with our team.
                                </p>
                            </div>

                            <div className=" items-center border-t pt-4 flex flex-row gap-5">
                                <p className="text-red-700 text-sm">Learn more about eligibility requirements and donation process</p>
                                <Link to="information  ">
                                    <FaArrowCircleRight className="text-red-700 text-2xl" />
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
