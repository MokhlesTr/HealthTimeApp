import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LayoutsDoctor = () => {
  return (
    <div className="flex flex-row bg-neutral-200 h-screen overflow-x-hidden w-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {/* Apply margin left to Outlet */}
        <div className="ml-60">
          <Outlet />
        </div>
      </div>
      {/* <div>Footer</div> */}
    </div>
  );
};

export default LayoutsDoctor;
