import React from "react";

function HomePageLayout({ children }) {
  return (
    <>
      <div>
        <div className="bg-blue-400">
          <div className="py-2 px-10">
            <div className="flex flex-row justify-center ">
              <span className="font-bold text-2xl text-white">
                Todo-Task-App
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-[92vh] justify-between bg-cyan-200">
          <div className=" flex-grow hidden md:block">
            <div className="flex h-full justify-center">
              <div className="flex flex-col justify-center">
                <div className="">
                  <p className="lg:pr-10 pl-5 lg:text-6xl text-4xl font-extrabold">
                    A Simple Project
                  </p>
                  <p className="pl-10 pt-4">
                    Based on CRUD operations (using Next-js , Tailwind CSS and
                    Express-js)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/3 md:w-1/2 w-full pt-10 px-8 ">
            <div className="max-w-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageLayout;
