import { useState } from "react";
import { GiHamburgerMenu, GiHeartDrop } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Button } from "./ui/Button";
import { Link, useLocation } from "react-router";


const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/donate", label: "Donate" },
    { path: "/request", label: "Request" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/register", label: "Register" },
  ];


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useLocation().pathname;


  return (
    <header className="sticky top-0 z-50 w-full shadow-md px-5 lg:px-10">
      <div className=" flex h-14 md:h-16 max-w-2xl mx-auto md:max-w-full items-center justify-between ">
        <div className="flex items-center gap-2 font-bold text-red-700">
          <GiHeartDrop className="text-3xl md:text-5xl" />
          <span className="text-2xl md:text-3xl">Blood Bond</span>
        </div>

        <span
          className={`block md:hidden transition-transform duration-300 hover:scale-110 text-red-700 text-2xl cursor-pointer }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <ImCross className="text-xl" /> :
            <GiHamburgerMenu className="text-3xl " />}
        </span>



        {/* Desktop Menu*/}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-gray-400 duration-200 ${pathname === path ? "text-red-700 pointer-events-none" : ""}`}
            >
              {path === "/register" ? (
                <Button>{label}</Button>
              ) : (
                label
              )}

            </Link>
          ))}
        </nav>
      </div>



      {/* SideBar of options */}
      <div
        className={`fixed rounded-lg top-16 right-5 w-48 bg-white/70 shadow-lg md:hidden transition-all duration-500 ease-in-out transform ${isMenuOpen
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
              {path === "/register" ? (
                <Button className="self-center">{label}</Button>
              ) : (
                label
              )}

            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar