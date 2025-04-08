import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../Context/Authcontext";


const SignInPage = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);

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

    return (
        <div className="md:w-1/2 flex items-center justify-center bg-red-100">
      <Card className="py-10 px-8 mx-5 max-w-2xl bg-white">

        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back !</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter the details to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      </div>

    );
};

export default SignInPage;
