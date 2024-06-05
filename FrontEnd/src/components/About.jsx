import React from "react";

import img from "../assets/img/about.jpg";

const About = () => {
  // const transactionsRef = useRef(null);
  // const assetsRef = useRef(null);
  // const newUsersRef = useRef(null);

  // useEffect(() => {
  //   const transactionsCount = 5000;
  //   const assetsCount = 180;
  //   const newUsersCount = 2400;

  //   const countUp = (element, count) => {
  //     let i = 0;
  //     const increment = Math.ceil(count / 100);
  //     const timer = setInterval(() => {
  //       i += increment;
  //       element.current.innerText = i.toLocaleString();
  //       if (i >= count) {
  //         clearInterval(timer);
  //       }
  //     }, 10);
  //   };

  //   countUp(transactionsRef, transactionsCount);
  //   countUp(assetsRef, assetsCount);
  //   countUp(newUsersRef, newUsersCount);
  // }, []);
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-5xl font-semibold text-center mb-20 lg:text-start">
          About Us
        </h1>
        <p className="text-justify lg:text-start">
          HealthTime is a revolutionary platform developed by ITGate that
          provides a seamless communication channel between doctors and
          patients. Our mission is to enhance the quality of healthcare by
          leveraging the power of technology.
        </p>
        <p className="text-justify lg:text-start">
          With HealthTime, patients can easily connect with their doctors,
          schedule appointments, and securely share medical information. Our
          platform is designed to streamline the healthcare process, ensuring
          efficient and effective communication between doctors and patients.
        </p>
        {/* <div className="text-center justify-center  lg:mr-40 pt-56 pb-8 p-20 h-4 items-center flex">
          <div className="grid grid-cols-1 gap-x-56 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <p className="text-base leading-7 text-gray-600">
                Transactions every month
              </p>
              <p
                ref={transactionsRef}
                className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
              >
                0
              </p>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <p className="text-base leading-7 text-gray-600">
                New Docotos annually
              </p>
              <p
                ref={assetsRef}
                className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
              >
                0
              </p>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <p className="text-base leading-7 text-gray-600">
                New Patients annually
              </p>
              <p
                ref={newUsersRef}
                className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
              >
                0
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className=" w-full lg:mt-0 mt-40 lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
