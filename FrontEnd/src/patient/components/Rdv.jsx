import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const Rdv = () => {
  const [status, setStatus] = useState(0);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: "000",
    // reason: "000",
    patientId: "000",
    date: "000",
    duration: 30, // Fixed value
    state: 0, // Fixed value
    subject: "Follow-up consultation",
  });

  const handleClick = (increment) => {
    setStatus((prevStatus) => {
      const newStatus = prevStatus + increment;
      return Math.max(0, Math.min(2, newStatus));
    });
  };

  const handleReasonClick = (reason) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      reason,
    }));
    handleClick(1); // Advance to the next step
  };

  const handleDateClick = (date, hour) => {
    const selectedDateTime = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${hour}`;
    setAppointmentData((prevData) => ({
      ...prevData,
      date: selectedDateTime,
    }));
    handleClick(1); // Advance to the next step
  };

  const handleSubmit = async () => {
    if (!appointmentData.reason || !appointmentData.date) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please ensure you have selected a reason and a date for the appointment.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData), // Use the appointment data
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      Swal.fire({
        icon: "success",
        title: "Appointment successfully confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset appointment data or redirect user as needed
      setStatus(0);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  return (
    <div
      className="min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url('https://masterbundles.com/wp-content/uploads/2023/02/wave-background-23-814.jpg')",
      }}
    >
      <div className="flex justify-center pt-28 mb-12">
        <ul className="steps text-xl space-x-6 font-semibold">
          {["Reason", "Date", "Success"].map((stepName, index) => (
            <li
              key={index}
              className={`step ${
                status >= index ? "step-primary" : "step-neutral text-white"
              } transition-colors duration-1000`}
            >
              {stepName}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center flex-col mx-auto items-center lg:ml-16 text-3xl gap-8 px-96">
        <div className="flex justify-center lg:ml-[-40%]">
          {status > 0 && (
            <button
              onClick={() => handleClick(-1)}
              className="text-white text-lg flex flex-row gap-2 font-semibold hover:text-xl"
            >
              <span className="pt-1">
                <FaAnglesLeft />
              </span>
              Previous Step
            </button>
          )}
        </div>
        {status === 0 && (
          <div>
            <div className="pb-8 flex justify-center items-center rounded-lg shadow-lg bg-white backdrop-blur-lg">
              <div className="w-svw max-w-3xl flex flex-col items-center">
                <p className="text-gray-900 w-full text-left px-12 py-4 font-semibold text-2xl cursor-pointer">
                  Choose your reason for consultation
                </p>
                <div className="text-xl py-4 w-full px-24">
                  <p
                    onClick={() =>
                      handleReasonClick("General Medicine consultation")
                    }
                    className="text-gray-900 px-8 py-4 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
                  >
                    General Medicine consultation
                  </p>
                  <p
                    onClick={() => handleReasonClick("Dental check-up")}
                    className="text-gray-900 px-8 py-4 my-5 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
                  >
                    Follow-up appointment
                  </p>
                  <p
                    onClick={() => handleReasonClick("Another reason")}
                    className="text-gray-900 px-8 py-4 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
                  >
                    Another reason
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {status === 1 && <CalendrierP handleDateClick={handleDateClick} />}
        {status === 2 && (
          <div>
            {/* <p className="text-white bg-indigo-500 p-4 rounded-lg">
              Appointment successfully confirmed!
            </p>
            <Link
              to={"/patient/appointements"}
              className="text-lg text-neutral-500 hover:text-white hover:animate-none flex justify-end font-semibold pt-4 animate-bounce"
            >
              Check My Appointments
            </Link> */}
            <Link
              to={"/patient/appointements"}
              onClick={handleSubmit}
              className="btn btn-primary mt-4"
            >
              Confirm Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendrierP = ({ handleDateClick }) => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handlePrevNextClick = (increment) => {
    setCurrMonth((prevMonth) => {
      const newMonth = prevMonth + increment;
      if (newMonth < 0 || newMonth > 11) {
        const newDate = new Date(currYear, newMonth, new Date().getDate());
        setCurrYear(newDate.getFullYear());
        return newDate.getMonth();
      }
      return newMonth;
    });
    setShowMore(false);
  };

  const handleDateClickInternal = (date, hour) => {
    setSelectedDate(date);
    handleDateClick(date, hour);
  };

  const renderCalendar = () => {
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const daysToShow = showMore ? lastDateOfMonth : 7;

    const calendarData = [];

    for (let i = 1; i <= daysToShow; i++) {
      const date = new Date(currYear, currMonth, i);
      const today = new Date();

      if (date >= today) {
        const availableHoursForDate = [
          "8:00",
          "8:30",
          "9:00",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
        ];

        calendarData.push({ date, availableHours: availableHoursForDate });
      }
    }

    return calendarData;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
      <section className="single-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 col-12 mb-3">
              <div className="calendar">
                <div className="flex items-center justify-between mb-4">
                  <span
                    id="prev"
                    className="material-symbols-rounded arrow-left cursor-pointer"
                    onClick={() => handlePrevNextClick(-1)}
                  >
                    <FaChevronLeft />
                  </span>
                  <h4 className="text-2xl mx-20 pt-4 font-semibold mb-4">
                    Choose consultation date
                  </h4>
                  <span
                    id="next"
                    className="material-symbols-rounded arrow-left cursor-pointer"
                    onClick={() => handlePrevNextClick(1)}
                  >
                    <FaChevronRight />
                  </span>
                </div>
                {renderCalendar().map((dayData, index) => (
                  <div
                    key={index}
                    className="day-container mb-6"
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      onClick={() => setSelectedDate(dayData.date)}
                      className="text-lg font-semibold border border-indigo-400 rounded-md mx-8 p-4"
                    >
                      {`${dayData.date.getDate()}/${
                        dayData.date.getMonth() + 1
                      }/${dayData.date.getFullYear()}`}
                    </p>
                    {selectedDate &&
                      selectedDate.getTime() === dayData.date.getTime() && (
                        <>
                          <hr className="my-4" />
                          <div className="flex flex-wrap my-2">
                            {dayData.availableHours.map((hour, hourIndex) => (
                              <div
                                key={hourIndex}
                                className="w-1/4 px-12 my-2"
                                onClick={() =>
                                  handleDateClickInternal(dayData.date, hour)
                                }
                              >
                                <div className="bg-blue-200 p-4 rounded-lg text-center cursor-pointer">
                                  {hour}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                  </div>
                ))}
                {!showMore ? (
                  <p
                    className="text-center hover:bg-sky-500 text-lg py-2 rounded-xl hover:text-white cursor-pointer"
                    onClick={() => setShowMore(true)}
                  >
                    Show more
                  </p>
                ) : (
                  <p
                    className="text-center hover:bg-sky-500 text-lg py-2 rounded-xl hover:text-white cursor-pointer"
                    onClick={() => setShowMore(false)}
                  >
                    Show less
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rdv;
