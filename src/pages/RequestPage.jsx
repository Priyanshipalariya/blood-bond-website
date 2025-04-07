import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Input, TextArea } from "../components/Input";
import { RadioGroup, RadioGroupItem } from "../components/Radio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
import {FiAlertCircle } from "react-icons/fi";
import { Button } from "../components/button";

const RequestPage = () => {


  const handleSubmit = (event) => {
   console.log("Request Submitted")
  };

  return (
   
      <div className="bg-red-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Blood</h1>
              <p className="text-gray-600 text-lg mb-6">
                Need blood urgently? Submit your request here and we'll connect you with potential donors.
              </p>

              <Card className="bg-white">
                <CardHeader className="px-6 pt-6 text-center">
                  <CardTitle>Blood Request Form</CardTitle>
                  <CardDescription>
                    Please provide accurate information to help us find the right donors for your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-600">Patient Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="patientName">Patient's Name</label>
                          <Input id="patientName" placeholder="Enter patient's name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="patientAge">Patient's Age</label>
                          <Input id="patientAge" type="number" placeholder="Enter patient's age" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label>Patient's Gender</label>
                        <RadioGroup defaultValue="male" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="patient-male" />
                            <label htmlFor="patient-male">Male</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="patient-female" />
                            <label htmlFor="patient-female">Female</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="patient-other" />
                            <label htmlFor="patient-other">Other</label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <label>Blood Type Needed</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type needed" />
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

                      <div className="space-y-2 pb-2">
                        <label>Units Required</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Unit</SelectItem>
                            <SelectItem value="2">2 Units</SelectItem>
                            <SelectItem value="3">3 Units</SelectItem>
                            <SelectItem value="4">4 Units</SelectItem>
                            <SelectItem value="5">5+ Units</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <hr className="text-gray-200 mt" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-600">Hospital Details</h3>
                      
                      <div className="space-y-2">
                        <label htmlFor="hospitalName">Hospital Name</label>
                        <Input id="hospitalName" placeholder="Enter hospital name" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="hospitalAddress">Hospital Address</label>
                          <Input id="hospitalAddress" placeholder="Enter hospital address" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="city">City</label>
                          <Input id="city" placeholder="Enter city" required />
                        </div>
                      </div>

                      <div className="space-y-2 py-2">
                        <label htmlFor="requiredBy">Required By</label>
                        <Input id="requiredBy" type="date" required />
                      </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-600">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="requesterName">Your Name</label>
                          <Input id="requesterName" placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="relation">Relation to Patient</label>
                          <Input id="relation" placeholder="E.g. Family member, friend, etc." required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone">Contact Phone</label>
                          <Input id="phone" placeholder="Enter your phone number" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email">Email</label>
                          <Input id="email" type="email" placeholder="Enter your email" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="additionalInfo">Additional Information</label>
                        <TextArea 
                          id="additionalInfo" 
                          placeholder="Please provide any additional details that might help potential donors"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <label>Urgency Level</label>
                        <RadioGroup className="flex-col" defaultValue="medium" required>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="urgency-high" />
                            <label htmlFor="urgency-high" className="text-red-600 font-medium">
                              Critical/Urgent (Needed within 24 hours)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="urgency-medium" />
                            <label htmlFor="urgency-medium" className="text-amber-600 font-medium">
                              Needed Soon (Within 1-3 days)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="urgency-low" />
                            <label htmlFor="urgency-low" className="text-green-600 font-medium">
                              Standard Request (Within a week)
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Button type="submit">
                      Submit Blood Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Request Guidelines</h3>
                
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">For Emergency Situations</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        If this is a life-threatening emergency, please contact your local hospital's blood bank directly or call emergency services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-900">What happens after submission?</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Your request is immediately shared with our donor network</li>
                    <li>Matching donors in your area are notified</li>
                    <li>Our team contacts you to verify details</li>
                    <li>Donors communicate directly or through our platform</li>
                  </ol>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-gray-700 mb-4">
                    Contact our support team at <span className="text-red-600 font-medium">support@bloodbond.org</span> or call our 24/7 helpline at <span className="text-blood font-medium">(555) 123-4567</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
  );
};

export default RequestPage;
