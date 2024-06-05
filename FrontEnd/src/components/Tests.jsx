import React, { useState } from "react";

const Tests = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);
  const [num, setNum] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    calculateResult(value);
  };

  const calculateResult = (value) => {
    const number = parseFloat(value);
    if (!isNaN(number)) {
      setResult(number * 2);
    } else {
      setResult(0);
    }
  };
  const inc = () => {
    setNum((num) => num + 1);
  };
  const dec = () => {
    setNum((num) => num - 2);
  };
  return (
    <>
      <div className="min-h-screen text-3xl text-center p-20 pt-40">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a number"
        />
        <p>Result: {result}</p>
        <div>
          <input
            type="text"
            name=""
            id=""
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="Number"
          />
          <h1>{num}</h1>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      </div>
    </>
  );
};

export default Tests;
