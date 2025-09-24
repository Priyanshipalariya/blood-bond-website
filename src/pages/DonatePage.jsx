import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import { Link } from "react-router";
import { ButtonLink , Button} from "../components/Button";
import { FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";


const DonatePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-red-100 py-12">
        <div className="mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Blood Donor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Your donation can save up to three lives. Learn about the donation process and how you can help.
          </p>
          <Link to="/register">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Donation Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Donation Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Donating blood is a simple and straightforward process that takes about an hour from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative">
              <CardHeader className="pb-4 py-4 px-4">
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base border border-red-200">1</span> 
                  <span className="text-lg sm:text-xl">Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out a registration form with your personal information and medical history.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative">
              <CardHeader className="pb-4 p-4">
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base border border-red-200">2</span> 
                  <span className="text-lg sm:text-xl">Screening</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm sm:text-base">
                  A brief health check including blood pressure, pulse, temperature, and hemoglobin level.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative">
              <CardHeader className="pb-4 p-4">
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base border border-red-200">3</span> 
                  <span className="text-lg sm:text-xl">Donation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm sm:text-base">
                  The actual blood donation takes only 8-10 minutes. You'll give about one pint of blood.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative">
              <CardHeader className="pb-4 p-4">
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base border border-red-200">4</span> 
                  <span className="text-lg sm:text-xl">Refreshments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm sm:text-base">
                  After donating, you'll rest and enjoy refreshments for 10-15 minutes before leaving.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Requirements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most healthy adults are eligible to donate blood. Here are the basic requirements:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 p-4">
                  <FiCheckCircle className="h-5 w-5 text-green-500" /> 
                  Basic Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Be at least 17 years old</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Weigh at least 110 pounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Be in good general health and feeling well</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Have not donated whole blood in the last 56 days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 p-4">
                  <FiAlertCircle className="h-5 w-5 text-amber-500" /> 
                  Temporary Deferrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FiAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>Recent illness or fever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>Pregnancy (wait 6 weeks after giving birth)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>Travel to certain countries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>Certain medications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/information">
              <ButtonLink  className="text-red-600">
                View complete eligibility guidelines
              </ButtonLink>
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default DonatePage;