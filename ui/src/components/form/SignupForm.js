import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { newUserRegistration } from "@/services/todo-service";
import { useRouter } from "next/router";
import {
  setAuthInCookie,
  setJwtInCookie,
  setNameInCookie,
  setroutePermissionInCookie,
} from "@/services/cookie-handler";

function SignupForm() {
  const router = useRouter();
  const [emailError, setEmailError] = React.useState(" ");
  const { register, handleSubmit, reset } = useForm();

  const userRegistration = (userData) => {
    newUserRegistration(userData)
      .then((responce) => {
        if (responce.status == true) {
          setJwtInCookie(responce.entity.token);
          setNameInCookie(responce.entity.name);
          setAuthInCookie("user")
          setroutePermissionInCookie(true);
          reset();
          router.push("/task");
        } else if (responce.status == false) {
          errorHandler(responce.entity);
        }
      })
      .catch((error) => console.log("error in adding user", error));
  };

  const errorHandler = (data) => {
    switch (data) {
      case "email already added":
        setEmailError(data);
        break;
      default:
        console.log(data);
    }
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <form onSubmit={handleSubmit(userRegistration)}>
        <div className="">
          <div className="bg-gray-200 font-bold text-xl text-center py-1">
            Create Account
          </div>
          <div className="px-5 py-4 flex flex-col space-y-5">
            <div>
              <label htmlFor="signupName">Name</label>
              <br />
              <input
                className="w-full rounded-sm pl-2"
                placeholder="Your Name"
                {...register("name")}
                id="signupName"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="signupEmail">E-mail</label>
              <br />
              <input
                className="w-full rounded-sm pl-2"
                placeholder="Sample@gmail.com"
                {...register("email")}
                id="signupEmail"
                type="email"
              />
              <p className="text-red-500 text-sm absolute ">
                {emailError === "" ? null : emailError}
              </p>
            </div>
            <div>
              <label htmlFor="signupPassword">Password</label>
              <br />
              <input
                className="w-full rounded-sm pl-2"
                placeholder="password"
                {...register("password")}
                id="signupPassword"
                type="password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-600 border hover:border-black rounded-md font-semibold text-white "
              >
                Sign-up
              </button>
            </div>

            <div className="text-sm text-center">
              Already have an account?{" "}
              <span className="text-blue-700 cursor-pointer hover:underline ">
                <Link href="/login">login</Link>
              </span>
            </div>
            <div className="text-sm text-center">
              <span className="text-blue-700 cursor-pointer hover:underline ">
                <Link href="/admin">Admin Login</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
