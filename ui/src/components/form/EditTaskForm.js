import React from "react";
import { useForm } from "react-hook-form";

function EditTaskForm({ data, close, refresh, apiFunction }) {
  const oldData = {
    taskName: data.taskName,
    taskStatus: data.taskStatus,
    taskDiscription: data.taskDiscription,
  };
  const { register, handleSubmit } = useForm({
    defaultValues: oldData,
  });

  // update api call
  const updateTask = (taskDetail) => {
    apiFunction(data.id, taskDetail)
      .then((responce) => {
        refresh();
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-100 md:h-80 md:w-96 flex flex-col">
      <div className="bg-slate-300 font-semibold text-xl text-center py-1 ">
        Update Task
      </div>
      <form onSubmit={handleSubmit(updateTask)}>
        <div className="flex flex-col justify-between grow">
          <div className="px-4 space-y-6">
            <div>
              <label htmlFor="newTaskName" className="font-medium">
                Task Name
              </label>
              <input
                type="text"
                className="w-full border"
                id="newTaskName"
                {...register("taskName")}
              />
            </div>
            <div>
              <label htmlFor="newTaskDetail" className="font-medium">
                Task Discription
              </label>
              <textarea
                rows={4}
                className="w-full border overflow-auto resize-none"
                {...register("taskDiscription")}
              />
            </div>
          </div>
          <div className="flex justify-end pr-4 space-x-4 pb-1">
            <button className="cancelTaskbutton" onClick={close}>
              Cancel
            </button>
            <button className="button">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
