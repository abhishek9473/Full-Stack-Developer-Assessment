import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  setAuthInCookie,
  setJwtInCookie,
  setNameInCookie,
  setroutePermissionInCookie,
} from "@/services/cookie-handler";
import { adminLogin } from "@/services/todo-service";

function AdminLoginForm() {
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");

  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const AdminLoginHandler = (formDetail) => {
    adminLogin(formDetail)
      .then((responce) => {
        if (responce.status == true) {
          setJwtInCookie(responce.entity.token);
          setNameInCookie(responce.entity.name);
          setAuthInCookie("admin");
          setroutePermissionInCookie(true);
          reset();
          router.push("/admin/home");
        } else if (responce.status == false) {
          errorHandler(responce.entity);
        }
      })
      .catch((err) => console.log(err));
  };

  const errorHandler = (data) => {
    switch (data) {
      case "Invalid email":
        setEmailError("Incorrect email");
        setPasswordError(" ");
        break;
      case "unauthorize email":
        setEmailError("email is not register as admin");
        setPasswordError(" ");
        break;
      case "Incorrect password":
        setPasswordError(data);
        setEmailError(" ");
        break;
      default:
        console.log(data);
    }
  };

  return (
    <div className="bg-blue-100 shadow-md">
      <form onSubmit={handleSubmit(AdminLoginHandler)}>
        <div className="">
          <div className="bg-blue-200 font-bold text-xl text-center py-1">
            Admin Login
          </div>
          <div className="px-5 py-4 flex flex-col space-y-5">
            <div>
              <label htmlFor="loginEmail">E-mail</label>
              <br />
              <input
                className="w-full rounded-sm pl-2 "
                placeholder="Sample@gmail.com"
                {...register("email")}
                id="loginEmail"
                type="email"
              />
              <p className="text-red-500 text-sm absolute ">
                {emailError === "" ? null : emailError}
              </p>
            </div>
            <div>
              <label htmlFor="loginPassword">Password</label>
              <br />
              <input
                className="w-full rounded-sm pl-2 "
                placeholder="password"
                {...register("password")}
                id="loginPassword"
                type="password"
              />
              <p className="text-red-500 text-sm absolute ">
                {passwordError === "" ? null : passwordError}
              </p>
            </div>
            <div className="pt-16">
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-600 border hover:border-black rounded-md font-semibold text-white "
              >
                Login
              </button>
            </div>

            <div className="text-sm text-center">
              <span className="text-blue-700 cursor-pointer hover:underline ">
                <Link href="/login">User Login</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminLoginForm;
