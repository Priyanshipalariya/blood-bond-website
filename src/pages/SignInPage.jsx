import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log("Login Successful")
        setIsLoading(true);

        if (email && password) {
            console.log("You have successfully signed in!")
            navigate("/");
        } else {
            console.log("Please enter both email and password.")
        }
    }

    return (
        <div className="max-w-md mx-auto my-10">
            <Card className="py-10">
                <div className="text-center mb-4">
                <h3 className="text-2xl text-gray-500 font-semibold">Welcome to 
                <span className="text-red-700 text-3xl font-bold"> Blood Bond</span>
                </h3>
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email ">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password">Password</label>
                                <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
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
