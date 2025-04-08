import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/SelectComponent";
import { Checkbox } from "../components/Checkbox";

const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    agreeToTerms: false,
  });
  const [isSignupLoading, setIsSignupLoading] = useState(false);


  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      const success = await login(loginEmail, loginPassword);

      if (success) {
        console.log("You have successfully signed in!")

        navigate("/home")
      }
      else {
        console.log("Invalid email or password.")
      }
    }
    catch (error) {
      console.log("An error occurred during sign in.")
    }
    finally {
      setIsLoginLoading(false);
    }
  };

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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {

      console.log("Please make sure your passwords match.")

      return;
    }

    if (!signupData.agreeToTerms) {
      console.log("You must agree to the terms and conditions.")

      return;
    }

    setIsSignupLoading(true);

    try {
      const success = await signup(signupData.email, signupData.password, {
        name: signupData.fullName
      });

      if (success) {
        console.log("You have successfully created an account!")
        navigate("/home");
      } else {
        console.log("This email may already be registered.")
      }
    }
    catch (error) {

      console.log("An error occurred during sign up.")
    }
    finally {
      setIsSignupLoading(false);
    }
  };
 
  return (
      <div className="max-w-md mx-auto my-10">
        <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                <CardDescription className="text-center">
                  Join our blood donation community
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignupSubmit}>
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
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bloodType">Blood Type</label>
                    <Select onValueChange={handleBloodTypeChange} value={signupData.bloodType}>
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

                  <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signupData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms" className="text-sm font-normal">
                      I agree to the terms and conditions
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-blood hover:bg-blood-dark"
                    disabled={isSignupLoading}
                  >
                    {isSignupLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                  <div className="text-center text-sm mt-2">
                    Already have an account?{" "}
                    <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/sign" className="text-red-600 hover:underline">
                Sign In
              </Link>
            </div>
                  </div>
                </CardFooter>
              </form>
            </Card>
      </div>
  );
};

export default SignUpPage;
