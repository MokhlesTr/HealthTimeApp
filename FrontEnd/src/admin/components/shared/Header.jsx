import React, { Fragment, useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [request, setRequest] = useState([]);
  const [countChanged, setCountChanged] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); // State to track if notification panel is open
  const navigate = useNavigate();
  const [nbRequest, setNbRequest] = useState();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:3000/request/pending");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setNbRequest(data.count);
        // console.log("data ==============================>>", data);

        setRequest(data);
        setCountChanged(true);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    // Fetch requests initially
    fetchRequests();

    // Set up interval to fetch requests every 5 seconds
    const intervalId = setInterval(fetchRequests, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 ">
      <div className="relative flex-grow flex-1 "></div>
      <div className="flex items-center gap-2 mr-2 z-50">
        <Popover className="relative ">
          {({ open }) => (
            <div>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 rounded-sm inline-flex items-center relative z-0 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <HiOutlineBell fontSize={24} />{" "}
                <span
                  className={classNames(
                    "bg-red-600 text-sm lg:mb-4 font-semibold text-white rounded-full size-5",
                    {
                      "animate-bounce": countChanged && request.length > 0,
                      "animate-none": !countChanged || request.length === 0,
                    }
                  )}
                  onAnimationEnd={() => setCountChanged(false)}
                >
                  {nbRequest}
                </span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-8 mt-2.5 w-96 ">
                  <div className="bg-white rounded-sm shadow-xl ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-semibold">
                      Notifications
                    </strong>
                    <Notification
                      setNotificationOpen={setNotificationOpen}
                      request={request.data}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <span className="sr-only">Open user menu</span>
            <div className="hover:bg-indigo-500 text-neutral-500 rounded-full hover:text-white ">
              <FaRegUserCircle size={30} />
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
            <Menu.Items className="cursor-pointer origin-top-right  absolute right-0 mt-2 w-48 rounded-sm shadow-xl p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "block px-4 py-2 text-gray-800 hover:text-white hover:bg-red-600"
                    )}
                    onClick={() => {
                      setNotificationOpen(false); // Close notification panel
                      navigate("//localhost:3001/login");
                    }}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

function Notification({ request, setNotificationOpen }) {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  // Sort requests by date in descending order
  const sortedRequests = request.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Display only the last four notifications
  const lastFourRequests = sortedRequests.slice(
    0,
    Math.min(sortedRequests.length, 4)
  );

  return (
    <Link to={"/admin/requests"} className="mt-2 py-1">
      {lastFourRequests.map((req, index) => (
        <div key={index}>
          <div className="py-2 px-4 m-4 flex cursor-pointer items-center justify-between hover:bg-blue-200 rounded-md border border-gray-900">
            <div className="flex-grow flex flex-col pr-4">
              <span className="text-lg font-semibold text-black">
                Dr. {req.sender.fname}
              </span>
              <div className="flex flex-col text-sm">
                <p className=" text-gray-700">{req.sender.specialization}</p>
                <p className=" text-gray-700">{req.sender.email}</p>
                <p className=" text-black font-semibold">
                  {formatDate(req.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={"/admin/requests"}
        className=" flex justify-center  mx-auto hover:font-semibold"
        onClick={() => setNotificationOpen(false)} // Close notification panel when clicking "Show More"
      >
        Show More..
      </Link>
    </Link>
  );
}

export default Header;
