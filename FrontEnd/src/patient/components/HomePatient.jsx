import React from "react";
import { Link } from "react-router-dom";
import backgroundblue from "../../assets/img/backgroundblue.png"; // Adjust the relative path accordingly

const HomePatient = () => {
  return (
    <div>
      <div
        className="relative overflow-hidden min-h-screen py-36 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundblue})`,
        }}
      >
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Find Your Perfect Doctor
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Explore our network of skilled doctors who are ready to provide
                you with personalized care and support for your healthcare
                needs.
              </p>
            </div>

            <div>
              <div className="mt-8  ">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl py-20 px-auto  lg:p-20"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://housecalldoctor.com.au/wp-content/uploads/2018/10/bac.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://infostride.com/wp-content/uploads/2023/07/MicrosoftTeams-image-27-1200x900.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-40 w-44 overflow-hidden rounded-full">
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/031/094/622/original/diet-plan-slim-woman-doing-exercise-and-planning-diet-with-fruit-and-vegetable-girl-doing-yoga-dietary-eating-meal-planning-nutrition-consultation-healthy-food-sport-health-lifestyle-fitness-vector.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-72 w-48  overflow-hidden rounded-lg">
                          <img
                            src="https://i.pinimg.com/736x/04/c2/32/04c2322450f71ec8425478b4f88e2834.jpg"
                            alt=""
                            className="h-full w-full  object-cover object-center "
                          />
                        </div>
                        <div className="h-40 w-44 p-4 overflow-hidden rounded-full">
                          <img
                            src="https://us.123rf.com/450wm/djvstock/djvstock1904/djvstock190430425/121066501-m%C3%A9dicaments-comprim%C3%A9s-g%C3%A9lules-vecteur-ic%C3%B4ne-m%C3%A9decine-illustration-design.jpg?ver=6"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://familydoctor.org/wp-content/uploads/2005/08/33803391_l.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i.pinimg.com/736x/a4/96/15/a49615b99c2946438293ca6611dee8b4.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/patient/mysearch"
                  className="hover:bg-primary inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-white bg-indigo-700 transition duration-300 animate-bounce"
                >
                  Get an Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePatient;
