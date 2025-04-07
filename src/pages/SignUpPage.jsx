import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
import { Checkbox } from "../components/Checkbox";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone:"",
    dob:"",
    bloodType: "",
    agreeToTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBloodTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, bloodType: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = (e) => {

    if (!formData.agreeToTerms) {
      console.log("You must agree to the terms and conditions.")
      return;
    }

    setIsLoading(true);
  };

  return (
      <div className="max-w-md mx-auto my-10">
        <Card className="py-10">
        <div className="text-center mb-4">
                <h3 className="text-2xl text-gray-500 font-semibold">Welcome to 
                <span className="text-red-700 text-3xl font-bold"> Blood Bond</span>
                </h3>
                </div>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-500">
              Join our blood donation community
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName">Full Name</label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone">Contact No.</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1 234 567 890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dob">Date of Birth</label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  placeholder="DD-MM-YYYY"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div className="space-y-2">
                <label htmlFor="bloodType">Blood Type</label>
                <Select onValueChange={handleBloodTypeChange} value={formData.bloodType}>
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
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link to="/terms" className="text-red-600 hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
              <div className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link to="/signin" className="text-red-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
};

export default SignUpPage;
