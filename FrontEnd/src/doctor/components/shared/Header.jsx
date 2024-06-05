import React, { Fragment, useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FaAnglesDown } from "react-icons/fa6";
import useLocalStorageUser from "../../../hooks/useLocalStorageUser";

const Header = () => {
  const navigate = useNavigate();
  const { deleteValue } = useLocalStorageUser();
  // eslint-disable-next-line no-unused-vars
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the database
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/appointments/All");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      console.log(data);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="bg-white h-16  px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative flex-1"></div>
      <div className="flex items-center gap-2 mr-2  ">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  " p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none  "
                )}
              >
                <Link to={"/doctor/calendar"}>
                  <HiOutlineBell fontSize={24} />
                </Link>
                <Link
                  to={"/doctor/calendar"}
                  className="bg-red-600 text-sm lg:mb-4 font-semibold text-white rounded-full size-2"
                ></Link>
              </Popover.Button>
              {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-8 mt-2.5 z-50 w-80">
                  <div className="bg-white  rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm ">
                      {" "}
                      <Link
                        to={"/doctor/calendar"}
                        className="py-2 px-4 m-4 flex cursor-pointer items-center justify-between hover:bg-blue-200 rounded-md border border-gray-900"
                      >
                        <div className="flex-grow flex flex-col pr-4">
                          <span className="text-lg font-semibold text-black">
                            Patient : Samir lahmer
                          </span>
                          <div className="flex flex-col text-sm">
                            <p className=" text-gray-700">Dental CheckUp</p>
                            <p className=" text-gray-700">
                              samirlahmer@gmail.com
                            </p>
                            <p className=" text-black font-semibold">
                              07-05-2024 08:30
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition> */}
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full z-50  ">
              <span className="sr-only">Open user menu</span>
              <div className="hidden lg:flex justify-center flex-row gap-2 items-center text-lg font-medium ">
                My Account
                <FaAnglesDown size={20} />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="cursor-pointer origin-top-right z-10 m-4 absolute right-0  w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 round-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/doctor/profil ")}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/login"}
                    className={classNames(
                      active && "bg-gray-100",
                      "block px-4 py-2 text-gray-800 hover:text-white hover:bg-red-600"
                    )}
                    onClick={deleteValue}
                  >
                    Logout
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
//flex flex-row w ba3ed thot wahda flex-1
//ORRR justify-between
