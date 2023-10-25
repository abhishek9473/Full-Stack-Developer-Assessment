import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddTaskForm from "@/components/form/AddTaskForm";
import EditTaskForm from "@/components/form/EditTaskForm";
import AccordionItem from "@/components/uiComponents/Accrodian";
import Modal from "@/components/uiComponents/Modal";
import {
  getAllTasks,
  deleteTaskWithId,
  updateTaskWithId,
} from "@/services/todo-service";
import DeleteTaskConfirm from "@/components/form/DeleteTaskConfirm";

function task() {
  const [pageReady, setPageReady] = useState(false);
  const [refreshtask, setRefreshtask] = useState(true);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState({});
  const [deleteTaskData, setDeleteTaskData] = useState("");

  const refreshPage = () => {
    setRefreshtask(!refreshtask);
  };

  // api call for all task data from database(sql by sequlize)
  useEffect(() => {
    getAllTasks()
      .then((responce) => {
        if (responce.status) {
          setAllTasks(responce.entity),
            setPageReady(true)
            // console.log("task data form sequlize", responce)
            
        }
      })
      .catch((err) => console.log("error in get all tasks", err));
  }, [refreshtask]);

  const editButtonHandler = (task) => {
    setEditTaskModal(true);
    setEditTaskData(task);
  };
  const deleteButtonHandler = (id) => {
    setDeleteTaskModal(true);
    setDeleteTaskData(id);
  };

  const confirmDeleteTask = () => {
    deleteTaskWithId(deleteTaskData).then((res) => {
      refreshPage();
      modalCloser();
    });
  };

  const modalCloser = () => {
    setAddTaskModal(false);
    setEditTaskModal(false);
    setDeleteTaskModal(false);
  };

  return (
    <div>
      <Navbar />

      <Modal isOpen={addTaskModal} onClose={modalCloser}>
        <AddTaskForm close={modalCloser} refresh={refreshPage} />
      </Modal>

      <Modal isOpen={deleteTaskModal} onClose={modalCloser}>
        <DeleteTaskConfirm close={modalCloser} confirm={confirmDeleteTask} />
      </Modal>

      <Modal isOpen={editTaskModal} onClose={modalCloser}>
        <EditTaskForm
          apiFunction={updateTaskWithId}
          data={editTaskData}
          close={modalCloser}
          refresh={refreshPage}
        />
      </Modal>

      <div className="w-full md:px-20 px-4 mt-5 mx-auto">
        <div className="border rounded-lg shadow">
          <div className="bg-slate-100 p-4 flex flex-row justify-between">
            <span className="font-bold text-xl">Tasks</span>

            <button
              className="button flex flex-row space-x-2"
              onClick={() => setAddTaskModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
          {pageReady &&
            allTasks?.map((task) => (
              <>
                <AccordionItem
                  key={task.id}
                  task={task}
                  title={task.taskName}
                  content={task.taskDiscription}
                  deleteButtonHandler={deleteButtonHandler}
                  editButtonHandler={editButtonHandler}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default task;
