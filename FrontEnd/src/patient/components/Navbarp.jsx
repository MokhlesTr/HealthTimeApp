import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";
import img from "C:/Users/ACER/Desktop/Version3/vis/src/assets/img/logoHealthTime.png";
import { Menu, Transition } from "@headlessui/react";
import { FaAnglesDown } from "react-icons/fa6";
import signOutService from "../../components/services/signOutService";
import useLocalStorageUser from "../../hooks/useLocalStorageUser";

const Navbarp = () => {
  const [menu, setMenu] = useState(false);
  useLocation();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState({});
  const { deleteValue } = useLocalStorageUser();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);
  const logout = () => {
    setMenu(false);
    deleteValue();

    signOutService
      .signOut()
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    localStorage.clear();
    // localStorage.removeItem("user");
    // navigate('/');
  };

  return (
    <div className="rounded-bl-full border border-blue-700 border-b-8 border-r-white bg-white fixed w-full z-10 text-gray-800">
      <div>
        <div className="flex justify-between items-center px-8 py-4 ">
          <Link to="/patient">
            <img className="h-10 pl-6" src={img} alt="Logo" />
          </Link>
          <nav className="hidden lg:flex justify-center items-center text-lg font-medium gap-5">
            <NavLink to="/patient">Home</NavLink>
            <NavLink to="/patient/mysearch">Search</NavLink>
            <NavLink to="/patient/appointements">Appointments</NavLink>
            {/* <NavLink to="/patient/rapports">My Reports</NavLink> */}
          </nav>

          {/* gestion de profil avec l'image de patient */}
          <Menu as="div" className="relative">
            <Menu.Button className=" items-center justify-center   hidden lg:flex">
              <span className="sr-only">Open user menu</span>
              <div className=" hidden lg:flex justify-center flex-row gap-2 items-center text-lg font-medium ">
                <div className="hidden lg:flex justify-center flex-row gap-2 items-center text-lg font-medium ">
                  My Account
                  <FaAnglesDown size={20} />
                </div>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-48 py-2 mt-2 origin-top-right bg-white rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/patient/appointements"
                      className={classNames(
                        active && "bg-gray-100",
                        "block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      )}
                    >
                      My Appointements
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/patient/profil/"
                      className={classNames(
                        active && "bg-gray-100",
                        "block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      )}
                    >
                      My Profile
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-red-600"
                    onClick={deleteValue}
                  >
                    Log Out
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

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
          <NavLink to="/patient" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/patient/mysearch" onClick={closeMenu}>
            Search
          </NavLink>
          <NavLink to="/patient/rdv" onClick={closeMenu}>
            Appointments
          </NavLink>

          <NavLink to="/patient/profil" onClick={closeMenu}>
            Profil
          </NavLink>
          <Link
            to="/login"
            className="hover:text-3xl hover:text-red-600 transition-all cursor-pointer"
            onClick={logout}
          >
            LogOut
          </Link>
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
        "hover:font-semibold hover:text-blue-400 pl-4 hover:transition-all cursor-pointer",
        { "text-blue-700 font-semibold": isActive }
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbarp;
