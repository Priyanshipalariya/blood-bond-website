import React from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import RegisterPage from "./pages/RegisterPage";
import RequestPage from "./pages/RequestPage";
import InformationPage from "./pages/InformationPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./Context/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <Header />
    //   <div className="flex-grow">
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/donate" element={<DonatePage />} />
    //       <Route path="/register" element={<RegisterPage />} />
    //       <Route path="/request" element={<RequestPage />} />
    //       <Route path="/information" element={<InformationPage />} />
    //       <Route path="/about" element={<AboutPage />} />
    //       <Route path="/contact" element={<ContactPage />} />
    //       <Route path="/signup" element={<SignUpPage/>}/>
    //       <Route path="/signin" element={<SignInPage/>}/>
    //       <Route path="*" element={<NotFound />} />

    //     </Routes>
    //   </div>
    //   <Footer />
    // </div>


    <AuthProvider>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
      
        <Route path="/home" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      
      </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>


  )
}

export default App