import React from "react";
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
import FAQ from "./pages/FAQ";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path = "/faq" element = {<FAQ/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>


  )
}

export default App