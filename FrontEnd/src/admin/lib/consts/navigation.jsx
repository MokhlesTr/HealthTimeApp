import { HiOutlineViewGrid, HiOutlineUsers } from "react-icons/hi";
import { FaFolderOpen } from "react-icons/fa6";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

// import {
//   IoIosCheckmarkCircleOutline,
//   IoIosCloseCircleOutline,
// } from "react-icons/io";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
  },

  {
    key: "Users Table",
    label: "Users Table",
    path: "/admin/userstable",
    icon: <HiOutlineUsers />,
  },
  // {
  //   key: "Patients",
  //   label: "Patients",
  //   path: "/admin/patients",
  //   icon: <HiOutlineUsers />,
  // },
  // {
  //   key: "Doctors",
  //   label: "Doctors",
  //   path: "/admin/doctors",
  //   icon: <FaUserDoctor />,
  // },
  {
    key: "Requests",
    label: "Requests",
    path: "/admin/requests",
    icon: <FaFolderOpen />,
  },
  {
    key: "ApprovedRequests",
    label: "Approved",
    path: "/admin/approvedreq",
    icon: <IoIosCheckmarkCircleOutline size={26} />,
  },
  {
    key: "RefusedRequests",
    label: "Refused",
    path: "/admin/refusedreq",
    icon: <IoIosCloseCircleOutline size={26} />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [];
