import { useState } from "react";
import { useNavigate } from "react-router";
import { GiHamburgerMenu, GiHeartDrop } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link, useLocation } from "react-router";
import { FaUserCircle, } from "react-icons/fa";
//import { CiLogin, CiLogout, CiSettings } from "react-icons/ci";


const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/donate", label: "Donate" },
    { path: "/request", label: "Request" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };


  return (
    <header className="sticky top-0 bg-white z-50 shadow-md px-5">
      <div className=" flex h-16 items-center justify-between ">
        <div className="flex items-center gap-2 font-bold text-red-700">
          <GiHeartDrop className="text-3xl md:text-5xl" />
          <span className="text-2xl lg:text-3xl">Blood Bond</span>
        </div>

        <span
          className={`block md:hidden transition-transform duration-300 text-red-700 text-2xl cursor-pointer }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <ImCross className="text-xl" /> :
            <GiHamburgerMenu className="text-3xl " />}
        </span>



        {/* Desktop Menu*/}
        <nav className="hidden md:flex items-center md:text-md lg:text-lg gap-6 lg:gap-8">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-gray-400 duration-200 ${pathname === path ? "text-red-700 pointer-events-none" : ""}`}
            >{label}
            </Link>
          ))}



          <div>
            <FaUserCircle className=" rounded-full text-red-700 text-3xl" />
          </div>
        </nav>
      </div>



      {/* SideBar of options */}
      <div
        className={`fixed rounded-lg top-18 right-2 w-48 bg-white text-md shadow-lg md:hidden transition-all duration-300 ease-in-out transform ${isMenuOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col px-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`border-b border-gray-100 py-2.5 hover:text-gray-400 transition-colors duration-200 ${pathname === path ? "text-red-700 pointer-events-none" : ""
                }`}


              onClick={() => setIsMenuOpen(false)}
            >
              {label}

            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar