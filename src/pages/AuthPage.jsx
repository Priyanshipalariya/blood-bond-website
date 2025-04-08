import { useState } from "react";
import { Route, useNavigate } from "react-router";
import SignInPage from "./SignInPage";
import { Routes } from "react-router";
import SignUpPage from "./SignUpPage";

const AuthPage = () => {
  return (
    <div className="md:flex min-h-screen">

      <div className="hidden md:flex px-10 py-auto flex-col text-center  items-center justify-center w-1/2 bg-gray-200">
        <h1 className="text-red-700 md:text-4xl lg:text-6xl font-bold"> Blood Bond</h1>
        <p className="text-red-700 mt-2">- where hope begins and lives are saved</p>
        <p className="mt-8 text-gray-500 text-lg">Empowering humanity one drop at a time—your journey starts here.</p>
        <img className="max-w-md" src="https://res.cloudinary.com/dfelqef5x/image/upload/v1744085333/km3mzvg8kgp6du0sxfk0.png " />
      </div>

      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>



    </div>




  );
};

export default AuthPage;
