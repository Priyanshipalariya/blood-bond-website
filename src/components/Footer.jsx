import { GiHeartDrop } from "react-icons/gi";
import { IoCallOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {

  const styleForLinks = `text-gray-600 hover:text-red-700 text-xs sm:text-sm hover:font-semibold hover:text-md`

  return (
    <footer className="bg-gray-300 px-8 ">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">

          <div className="col-span-1 ">
            <div className="flex items-center gap-2 font-bold text-2xl text-red-600 mb-2 mt-5">
              <GiHeartDrop className="text-4xl" />
              <span className="text-2xl">Blood Bond</span>
            </div>
            <p className="text-gray-600 text-sm lg:text-md font-mono">
              Connecting blood donors with recipients. Every donation saves lives.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 ">
            <div className="col-span-1">
              <h3 className="font-bold text-sm sm:text-lg mt-5 mb-1 font-mono text-gray-600">Quick Links</h3>
              <ul className=" space-y-1 sm:space-y-2">
                <li><Link to="/" className={styleForLinks}>Home</Link></li>
                <li><Link to="/donate" className={styleForLinks}>Donate Blood</Link></li>
                <li><Link to="/request" className={styleForLinks}>Request Blood</Link></li>
                <li><Link to="/information" className={styleForLinks}>Donation Info</Link></li>
              </ul>
            </div>

            <div className="col-span-1 hidden sm:block">
              <h3 className="font-bold text-lg mt-5 mb-1 font-mono text-gray-600">About/Support</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className={styleForLinks}>About Us</Link></li>
                <li><Link to="/contact" className={styleForLinks}>Contact</Link></li>
                <li><Link to="/register" className={styleForLinks}>Become a Donor</Link></li>
                <li><Link to="/faq" className={styleForLinks}>FAQs</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-bold text-sm sm:text-lg mt-5 mb-1 font-mono text-gray-600">Contact Us</h3>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                  <IoCallOutline className="h-4 w-4" />
                  <span>+1 234 567 890</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                  <IoMailOutline className="h-4 w-4" />
                  <span>info@bloodbond.org</span>
                </div>

                <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                  <IoLocationOutline className="h-4 w-4 mt-1" />
                  <span>123 XYZ ,<br />Healthcare City, 12345</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 md:mt-10 py-4 text-center text-sm md:text-md text-gray-600">
          <p>&#169; 2025 Blood_Bond. All rights reserved.</p>
        </div>


      </div>

    </footer>
  )
};

export default Footer;