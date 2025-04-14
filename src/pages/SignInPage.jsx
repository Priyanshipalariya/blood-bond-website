import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../Context/Authcontext";
import { GiHeartDrop } from "react-icons/gi";
import AuthPage from "./AuthPage";


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

        navigate("/")
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
    <AuthPage>
      <div className="flex flex-col min-h-screen justify-center mx-8">
        <div className="md:hidden text-center mb-7">
          <div className="flex items-center justify-center gap-2">
            <GiHeartDrop className="h-10 w-10 text-red-700" />
            <h1 className="text-red-700 text-4xl font-bold">Blood Bond</h1>
          </div>
          <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
        </div>

        <div className="flex items-center justify-center bg-red-100">
          <Card className="py-10 px-8 mx-auto w-full max-w-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
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

              <CardFooter className="flex flex-col space-y-2">
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
      </div>
    </AuthPage>
  );
};

export default SignInPage;
