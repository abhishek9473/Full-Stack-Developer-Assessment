import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/childrenComponent/UserInfo";
import { getAllUsers } from "@/services/todo-service";
import { useRouter } from "next/router";
import NotificationIcon from "@/components/childrenComponent/NotificationIcon";
import AdminLayout from "@/layout/AdminLayout";

function home() {
  const [pageReady, setPageReady] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const router = useRouter();

  // api call
  useEffect(() => {
    getAllUsers()
      .then((responce) => {
        if (responce.status) {
          setUsersList(responce.entity);
          setPageReady(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const taskByUserHandler = (id) => {
    const userTasksParams = {
      user: id,
    };
    const queryString = new URLSearchParams(userTasksParams).toString();
    router.push(`/admin/tasks?${queryString}`);
  };

  const allUsersTasksHandler = () => {
    const userTasksParams = {
      user: "all",
    };
    const queryString = new URLSearchParams(userTasksParams).toString();
    router.push(`/admin/tasks?${queryString}`);
  };

  return (
    <>
      <AdminLayout>
        <div className="w-full md:px-20 px-4 mt-5 mx-auto">
          <div className="border rounded-lg shadow">
            <div className="bg-slate-100 p-4 flex flex-row justify-between">
              <span className="font-bold text-xl">Users List</span>
              <button
                className="button flex flex-row space-x-2"
                onClick={() => allUsersTasksHandler()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span>All Task</span>
              </button>
            </div>
            {pageReady &&
              usersList?.map((user, i) => (
                <UserInfo key={i} data={user} click={taskByUserHandler} />
              ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default home;
