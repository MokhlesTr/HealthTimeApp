import React, { useState } from "react";
import TableDoctors from "./TableDoctors";
import TableUsers from "./TableUsers";
import { Transition } from "@headlessui/react";

const UsersTable = () => {
  const [select, setSelect] = useState("doctor");
  const handleSelectChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <div>
      <Select onSelectChange={handleSelectChange} />
      <Transition
        show={select === "doctor"}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {select === "doctor" && <TableDoctors />}
      </Transition>
      <Transition
        show={select === "patient"}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {select === "patient" && <TableUsers />}
      </Transition>
    </div>
  );
};

export default UsersTable;

function Select({ onSelectChange }) {
  return (
    <div className=" float top-0 absolute pl-2 pt-1  ">
      <form>
        <select
          id="options"
          className="font-semibold text-lg rounded-lg bg-neutral-900 border border-gray-400 text-white block w-full p-2.5 "
          onChange={onSelectChange}
        >
          <option value="doctor">Doctor Table</option>
          <option value="patient">Patient Table</option>
        </select>
      </form>
    </div>
  );
}
