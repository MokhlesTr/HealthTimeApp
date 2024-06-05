import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import img from "C:/Users/ACER/Desktop/Version3/vis/src/assets/img/logoHealthTime.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  useLocation();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="rounded-bl-full border border-blue-700 border-b-8 border-r-white bg-white fixed w-full z-10 text-gray-800">
      <div>
        <div className="flex justify-between items-center px-8  py-4 ">
          <Link to="/home">
            <img className="h-10 pl-6" src={img} alt="Logo" />
          </Link>

          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-7">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/services">Services</NavLink>
            {/* <NavLink to="/OurDoctors">Doctors</NavLink> */}
            <NavLink to="/blog">Blog</NavLink>
          </nav>

          <div className="hidden lg:flex">
            <Link to="/login">
              <CiLogin size={40} />
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          }  lg:hidden mt-4 rounded-tl-3xl flex flex-col absolute bg-backgroundColor bg-black bg-opacity-85  text-white h-screen left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-12 w-full transition-transform duration-400`}
        >
          <NavLink to="/home" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/search" onClick={closeMenu}>
            Search
          </NavLink>
          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>
          {/* <NavLink to="/OurDoctors" onClick={closeMenu}>
            Doctors
          </NavLink> */}
          <NavLink to="/blog" onClick={closeMenu}>
            Blog
          </NavLink>

          <div className="lg:hidden">
            <Link
              to="login"
              className="hover:text-3xl  bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={closeMenu}
            >
              Log in
            </Link>
          </div>
          <div className="lg:hidden">
            <Link
              to="signup"
              className="hover:text-3xl  bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={closeMenu}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom NavLink component for conditional styling
const NavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={classNames(
        "hover:font-semibold hover:text-blue-400 hover:transition-all cursor-pointer",
        { "text-blue-700 font-semibold": isActive } // Apply this style if link is active
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
