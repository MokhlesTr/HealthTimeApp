import React from "react";
import { Link } from "react-router-dom";
import OurDoctors from "./OurDoctors";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/backg.png')] bg-no-repeat bg-cover ">
        <div className="w-full lg:w-4/5 space-y-5 bg-white bg-opacity-75 border text-black p-8 rounded-r-3xl rounded-tl-3xl ">
          <h1 className="text-5xl text-black  font-bold leading-tight">
            Empowering Health Choices for a Vibrant Life Your Trusted..
          </h1>
          <p>
            Welcome to HealthTime, where we're dedicated to revolutionizing
            healthcare access. Our platform seamlessly connects patients with
            trusted healthcare providers, offering a comprehensive suite of
            services designed to enhance your well-being and streamline your
            healthcare journey. Whether you're seeking quality medical care,
            convenient appointment scheduling, or personalized health resources,
            HealthTime is your trusted partner every step of the way.
          </p>
        </div>
        <div className="  bg-blue-700 max-w-max mt-4 rounded-full   hover:text-blue-800 ">
          <Link
            to="/services"
            class="group hover:bg-indigo-600 inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-white bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            <span class="absolute inset-0 bg-indigo-700 opacity-50 rounded-lg group-hover:opacity-0 transition duration-300"></span>
            See Services
          </Link>
        </div>
      </div>

      <div>
        <div
          class=" lg:relative  overflow-hidden   bg-cover  bg-center "
          style={{
            backgroundImage:
              "url('https://scontent.ftun16-1.fna.fbcdn.net/v/t1.15752-9/436622660_310259928769799_2901335664014297385_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iOOfA-vEMVkQ7kNvgEiFFaG&_nc_ht=scontent.ftun16-1.fna&oh=03_Q7cD1QEYgs-G6zurJrSSuOqsX2yTgnIbkB-U_P7SxvdCLOG_Uw&oe=66539AD8')",
            backgroundPosition: "bottom",
          }}
        >
          <div class="    lg:pt-40">
            <div class="lg:relative  mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div class="sm:max-w-lg ">
                <h1 class=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Find Your Perfect Doctor
                </h1>
                <p class="mt-4 text-xl text-gray-500">
                  Explore our network of skilled doctors who are ready to
                  provide you with personalized care and support for your
                  healthcare needs.
                </p>
              </div>

              <div>
                <div class="my-16 mb-24 relative ">
                  <div
                    aria-hidden="true"
                    class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div class="flex items-center space-x-6 lg:space-x-8">
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            <img
                              src="https://housecalldoctor.com.au/wp-content/uploads/2018/10/bac.jpg"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                          <div class="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://infostride.com/wp-content/uploads/2023/07/MicrosoftTeams-image-27-1200x900.png"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                        </div>
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-40 w-44 overflow-hidden rounded-full">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/031/094/622/original/diet-plan-slim-woman-doing-exercise-and-planning-diet-with-fruit-and-vegetable-girl-doing-yoga-dietary-eating-meal-planning-nutrition-consultation-healthy-food-sport-health-lifestyle-fitness-vector.jpg"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                          <div class="h-72 w-48 overflow-hidden rounded-lg">
                            <img
                              src="https://i.pinimg.com/736x/04/c2/32/04c2322450f71ec8425478b4f88e2834.jpg"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                          <div class="h-40 w-44 p-4 overflow-hidden rounded-full">
                            <img
                              src="https://us.123rf.com/450wm/djvstock/djvstock1904/djvstock190430425/121066501-m%C3%A9dicaments-comprim%C3%A9s-g%C3%A9lules-vecteur-ic%C3%B4ne-m%C3%A9decine-illustration-design.jpg?ver=6"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                        </div>
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://familydoctor.org/wp-content/uploads/2005/08/33803391_l.jpg"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                          <div class="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://i.pinimg.com/736x/a4/96/15/a49615b99c2946438293ca6611dee8b4.jpg"
                              alt=""
                              class="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/login"
                    class="group hover:bg-indigo-600 inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-white bg-indigo-700 transition duration-300 transform hover:scale-105"
                  >
                    <span class="absolute inset-0 bg-indigo-700 opacity-50 rounded-lg group-hover:opacity-0 transition duration-300"></span>
                    Get an Appointment
                  </Link>
                </div>
              </div>
            </div>

            <OurDoctors />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
