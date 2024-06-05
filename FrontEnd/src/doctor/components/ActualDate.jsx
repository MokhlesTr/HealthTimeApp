import React from "react";
import { format, startOfWeek, addDays } from "date-fns";

const ActualDate = () => {
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfWeek(today);

  const renderDay = (day, index) => {
    const currentDate = addDays(startDate, index);
    const isToday = currentDate.getDate() === today.getDate();
    const isActive = isToday ? "bg-purple-500" : "";
    const textColor = isToday ? "text-white" : "text-gray-900";

    return (
      <div
        key={index}
        className={`flex group hover:bg-purple-500 hover:shadow-lg hover:dark-shadow rounded-full mx-1 transition-all duration-300 cursor-pointer justify-center w-20 ${isActive}`}
      >
        <div className="flex items-center px-4 py-4">
          <div className="text-center">
            <p
              className={`text-gray-900 group-hover:text-gray-100 text-lg font-bold transition-all duration-300 ${textColor}`}
            >
              {day}
            </p>
            <p
              className={`text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold text-lg transition-all duration-300 ${textColor}`}
            >
              {format(currentDate, "d")}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="  p-6 overflow-hidden">
      <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg mx-auto py-4 px-2 md:mx-12 mb-10">
        {daysOfWeek.map((day, index) => renderDay(day, index))}
      </div>
    </div>
  );
};

export default ActualDate;
