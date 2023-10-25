import React, { useEffect, useState } from "react";

import PopoverComponent from "./uiComponents/Popover";
import NavbarMenu from "./childrenComponent/NavbarMenu";
import { getAuth, getUserName } from "@/services/identity";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Navbar({ notificationArea, role, notificationAreaclick }) {
  const [userLoginValue, setUserLoginValue] = useState(null);

  const cookieToken = Cookies.get("token");
  const validUser = Cookies.get("validUser");
  const permission = cookieToken && validUser ? true : false;

  const router = useRouter();

  const [capitalizedName, setCapitalizedName] = useState("");

  useEffect(() => {
    const name = getUserName() || "User";
    setCapitalizedName(name?.charAt(0).toUpperCase() + name?.slice(1));
  }, []);

  // check user login or not
  useEffect(() => {
    const LoginValue = getAuth() && getUserName() ? true : false;
    setUserLoginValue(LoginValue);
  }, []);

  return (
    <nav className="bg-blue-400 sticky top-0 z-10">
      <div className="py-2 sm:px-10">
        <div className="flex flex-row justify-between ">
          <span className="px-3 pt-1 font-semibold text-white ">
            {role ? (
              <span
                onClick={() => router.push("/admin/home")}
                className="bg-teal-800 px-2 py-1 cursor-pointer"
              >
                {role}
              </span>
            ) : null}
          </span>
          <span className="font-bold text-2xl text-white">Todo-Task-App</span>
          <span className="flex flex-row md:space-x-10 space-x-4">
            <span>
              {notificationArea ? (
                <span onClick={notificationAreaclick}>{notificationArea}</span>
              ) : null}
            </span>
            <span className="flex flex-row space-x-4">
              {!userLoginValue ? (
                <>
                  <div
                    className={`bg-yellow-800 text-white font-semibold px-4 py-1 rounded-md ${
                      permission ? "hidden" : "block"
                    }`}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </div>
                </>
              ) : (
                <>
                  <PopoverComponent
                    buttonlevel={
                      <span className="flex flex-row sm:space-x-2 font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p>{capitalizedName}</p>
                      </span>
                    }
                  >
                    <NavbarMenu />
                  </PopoverComponent>
                </>
              )}
            </span>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
