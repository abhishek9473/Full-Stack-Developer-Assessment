import task from "@/pages/task";
import React from "react";

function NotificationTaskDetail({ data, modalCloser }) {
  const taskType = data?.taskAction;

  if (taskType === "delete") {
    return (
      <div className="md:w-72 h-auto md:h-72 flex flex-col ">
        <div className="text-center font-semibold bg-red-300 text-xl py-1">
          Task Not Found
        </div>
        <div className="py-5 grow flex flex-col justify-between ">
          <div>
            <p className="font-medium"> Task is Deleted by user </p>
          </div>
          <div className="text-xs ">
            <p>user : {data.userEmail}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="button py-1" onClick={modalCloser} type="button">
            ok
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="md:w-72 h-auto md:h-72 flex flex-col ">
        <div
          className={`text-center font-semibold text-xl py-1 ${
            taskType == "update" ? "bg-green-400" : "bg-blue-400"
          } `}
        >
          {taskType == "update" ? "Task updated" : "New task added"}
        </div>
        <div className="py-5 grow flex flex-col justify-between ">
          <div>
            <p className="font-medium">Task name : {data?.taskName} </p>
            <p className="text-sm text-gray-600">
              Task Discription : {data?.taskDiscription}
            </p>
          </div>
          <div className="text-xs ">
            <p>user : {data.userEmail}</p>
            <p>time : {data.date}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="button py-1" onClick={modalCloser} type="button">
            ok
          </button>
        </div>
      </div>
    );
  }
}

export default NotificationTaskDetail;
