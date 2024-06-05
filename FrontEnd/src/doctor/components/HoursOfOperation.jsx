import React, { useState } from "react";

function HoursOfOperation() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeOptions = [
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  const [tableValues, setTableValues] = useState(
    days.map((day) => ({
      day,
      session: day === "Saturday" || day === "Sunday" ? "closed" : "double",
      singleSessionBegin: "",
      singleSessionEnd: "",
      doubleSessionBegin1:
        day !== "Saturday" && day !== "Sunday" ? "9:00 AM" : "",
      doubleSessionEnd1:
        day !== "Saturday" && day !== "Sunday" ? "12:00 PM" : "",
      doubleSessionBegin2: "",
      doubleSessionEnd2: "",
    }))
  );

  const handleSessionChange = (rowIndex, event) => {
    const { value } = event.target;
    setTableValues((prevData) =>
      prevData.map((item, index) =>
        index === rowIndex ? { ...item, session: value } : item
      )
    );
  };

  const handleInputChange = (rowIndex, field, event) => {
    const { value } = event.target;
    setTableValues((prevData) =>
      prevData.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item
      )
    );
  };

  const confirmDate = () => {
    console.log(tableValues);
  };

  return (
    <div className="container mx-auto px-56 py-8">
      <label
        htmlFor="age"
        className="block text-sm font-semibold leading-6 mb-4 text-gray-900"
      >
        Work Time
      </label>
      <table className="table-auto w-full text-left">
        <thead className="text-xs text-white font-semibold uppercase bg-indigo-400">
          <tr>
            <th className="p-2 sticky top-0">Day</th>
            <th className="p-2">Session</th>
            <th className="p-2">
              {" "}
              <span className="font-light text-black">1st</span> Session Start
            </th>
            <th className="p-2">
              <span className="font-light text-black">1st</span> Session End
            </th>
            <th className="p-2">
              <span className="font-light text-black">2nd</span> Session Start{" "}
            </th>
            <th className="p-2">
              <span className="font-light text-black">2nd</span> Session End{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableValues.map((item, rowIndex) => (
            <tr
              key={item.day}
              className="border border-gray-200 hover:bg-gray-100"
            >
              <td className="p-2 sticky left-0">{item.day}</td>
              <td className="p-2">
                <select
                  value={item.session}
                  onChange={(e) => handleSessionChange(rowIndex, e)}
                >
                  <option value="double">Double</option>
                  <option value="single">Single</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              {/* Session Start input */}
              <td className="p-2">
                {/* Check if session is closed, if so, hide the input */}
                {item.session !== "closed" && (
                  <select
                    value={item.singleSessionBegin}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "singleSessionBegin", e)
                    }
                    disabled={item.session === "closed"}
                  >
                    <option value="">Select Time</option>
                    {timeOptions.map((timeOption, index) => (
                      <option key={index} value={timeOption}>
                        {timeOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              {/* Session End input */}
              <td className="p-2">
                {/* Check if session is closed, if so, hide the input */}
                {item.session !== "closed" && (
                  <select
                    value={item.singleSessionEnd}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "singleSessionEnd", e)
                    }
                    disabled={item.session === "closed"}
                  >
                    <option value="">Select Time</option>
                    {timeOptions.map((timeOption, index) => (
                      <option key={index} value={timeOption}>
                        {timeOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              {/* Session Start 2 input */}
              <td className="p-2">
                {/* Check if session is not single or closed, if so, hide the input */}
                {item.session !== "single" && item.session !== "closed" && (
                  <select
                    value={item.doubleSessionBegin2}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "doubleSessionBegin2", e)
                    }
                    disabled={
                      item.session === "single" || item.session === "closed"
                    }
                  >
                    <option value="">Select Time</option>
                    {timeOptions.map((timeOption, index) => (
                      <option key={index} value={timeOption}>
                        {timeOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              {/* Session End 2 input */}
              <td className="p-2">
                {/* Check if session is not single or closed, if so, hide the input */}
                {item.session !== "single" && item.session !== "closed" && (
                  <select
                    value={item.doubleSessionEnd2}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "doubleSessionEnd2", e)
                    }
                    disabled={
                      item.session === "single" || item.session === "closed"
                    }
                  >
                    <option value="">Select Time</option>
                    {timeOptions.map((timeOption, index) => (
                      <option key={index} value={timeOption}>
                        {timeOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="  justify-end mt-8  flex">
        <button
          type="button"
          className="hover:text-indigo-500   btn btn-outline-primary bg-indigo-500 text-white"
          onClick={confirmDate}
        >
          Confirm Date
        </button>
      </div>
    </div>
  );
}

export default HoursOfOperation;
