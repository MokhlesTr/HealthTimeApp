import React from "react";
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";
import DoctorGender from "./DoctorGender";
import Dashboarddd from "./Dashboarddd";
// import ActualDate from "./ActualDate";

const DashboardDoctor = () => {
  return (
    <div className="flex gap-4 flex-col ">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full p-8">
        <DoctorGender />
        <TransactionChart />
        <Dashboarddd />
      </div>
    </div>
  );
};

export default DashboardDoctor;
