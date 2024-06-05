import React from "react";
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";
import DoctorGender from "./DoctorGender";
import DoctorAge from "./DoctorAge";
import RequestDash from "./RequestDash";
// import DashTest from "./DashTest";
// import LineCh from "./LineCh";
// import TableRecent from "./TableRecent";

const Dashboard = () => {
  return (
    <div className="flex  flex-col z-0 ">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full p-4 ">
        {/* sm:flex-col */}
        <DoctorGender />
        <TransactionChart />
        <DoctorAge />
      </div>
      <div className="flex flex-row  gap-4 w-full px-4 ">
        <RequestDash />
      </div>
      {/* <DashTest /> */}
    </div>
  );
};

export default Dashboard;
