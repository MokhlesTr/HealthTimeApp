import React, { useState } from "react";
import { format, eachHourOfInterval } from "date-fns";

const Schedule = () => {
  const [setSelectedDate] = useState(new Date()); // Initialize with a default date

  const handleClick = (date) => {
    setSelectedDate(date);
  };

  const hoursOfDay = eachHourOfInterval({
    start: new Date(0, 0, 0, 8), // Start from 8:00 AM
    end: new Date(0, 0, 0, 17), // End at 5:00 PM
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <div className="bg-white p-8 rounded-3xl m-8 shadow-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th></th>
              {daysOfWeek.map((day, idx) => (
                <th
                  key={idx}
                  className="text-center font-semibold text-md uppercase tracking-wider text-gray-400"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hoursOfDay.map((hour, idx) => (
              <tr key={idx}>
                <td className="text-center font-semibold text-md uppercase tracking-wider text-gray-400">
                  {format(hour, "HH:mm")}
                </td>
                {Array.from({ length: 7 }).map((_, dayIdx) => (
                  <td
                    key={dayIdx}
                    className="text-center py-1 border border-gray-800 cursor-pointer"
                    onClick={() => handleClick(new Date())} // Replace new Date() with your date logic
                  >
                    {/* You can display any content for each time slot */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
