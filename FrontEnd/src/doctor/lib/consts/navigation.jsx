import {
  HiOutlineViewGrid,
  //HiOutlineUsers, patient logo
  HiOutlineCog,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlinePencilAlt,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/doctor",
    icon: <HiOutlineViewGrid />,
  },

  {
    key: "Medical Reports",
    label: "MedicalReport",
    path: "/doctor/reports",
    icon: <HiOutlinePencilAlt />,
  },

  {
    key: "Appointments",
    label: "Appointments",
    path: "/doctor/calendar",
    icon: <HiOutlineCalendar />,
  },
  {
    key: "Patients",
    label: "Patients",
    path: "/doctor/patients",
    icon: <HiOutlineUsers />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "Profil",
    label: "Profil",
    path: "/doctor/profil",
    icon: <HiOutlineCog />,
  },
];
