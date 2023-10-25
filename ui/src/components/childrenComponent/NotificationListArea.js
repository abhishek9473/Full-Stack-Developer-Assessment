import { useState } from "react";
import { localTime } from "../functions/localTimeConverter";

function NotificationListArea({ data, click }) {
  const taskTypeToType = {
    new: {
      value: "New Task Added",
      i: "bg-blue-500",
    },
    update: {
      value: "Task Update",
      i: "bg-green-500",
    },
    delete: {
      value: "Task Delete",
      i: "bg-red-500",
    },
  };

  const taskType = data.taskType;
  const type = taskTypeToType[taskType].value;

  const time = localTime(data.updatedAt);

  return (
    <>
      <div
        className={`p-4 border-b hover:bg-slate-200`}
        onClick={click ? () => click(data.taskId) : null}
      >
        <div className="flex justify-start space-x-5">
          <span className={`${taskTypeToType[taskType].i} w-2 `} />

          <div>
            <p className="font-semibold">{type} </p>
            <p>User : {data?.User.email} </p>
            <p className="text-sm text-gray-600">Time : {time} </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationListArea;
