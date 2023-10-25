import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddTaskForm from "@/components/form/AddTaskForm";
import EditTaskForm from "@/components/form/EditTaskForm";
import AccordionItem from "@/components/uiComponents/Accrodian";
import Modal from "@/components/uiComponents/Modal";
import {
  deleteTaskWithIdAminCall,
  getAllTasksAdminCall,
  updateTaskAdminCall,
} from "@/services/todo-service";
import DeleteTaskConfirm from "@/components/form/DeleteTaskConfirm";
import NotificationIcon from "@/components/childrenComponent/NotificationIcon";
import { useRouter } from "next/router";
import AdminLayout from "@/layout/AdminLayout";

function index() {
  const [pageReady, setPageReady] = useState(false);
  const [refreshtask, setRefreshtask] = useState(true);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState({});
  const [deleteTaskData, setDeleteTaskData] = useState("");

  const router = useRouter();
  const query = router.query;
  const userId = query.user;

  const refreshPage = () => {
    setRefreshtask(!refreshtask);
  };

  // api call for all task data from database(sql by sequlize)
  useEffect(() => {
    getAllTasksAdminCall(userId)
      .then((responce) => {
        if (responce.status) {
          setAllTasks(responce.entity);
          setPageReady(true);
        }
      })
      .catch((err) => console.log("error in get all tasks", err));
  }, [refreshtask, userId]);

  const editButtonHandler = (task) => {
    setEditTaskModal(true);
    setEditTaskData(task);
  };
  const deleteButtonHandler = (id) => {
    setDeleteTaskModal(true);
    setDeleteTaskData(id);
  };

  const confirmDeleteTask = () => {
    deleteTaskWithIdAminCall(deleteTaskData).then((res) => {
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
    <AdminLayout>
      <div>
        <Modal isOpen={addTaskModal} onClose={modalCloser}>
          <AddTaskForm close={modalCloser} refresh={refreshPage} />
        </Modal>

        <Modal isOpen={deleteTaskModal} onClose={modalCloser}>
          <DeleteTaskConfirm close={modalCloser} confirm={confirmDeleteTask} />
        </Modal>

        <Modal isOpen={editTaskModal} onClose={modalCloser}>
          <EditTaskForm
            apiFunction={updateTaskAdminCall}
            data={editTaskData}
            close={modalCloser}
            refresh={refreshPage}
          />
        </Modal>

        <div className="w-full md:px-20 px-4 mt-5 mx-auto">
          <div className="border rounded-lg shadow">
            <div className="bg-slate-100 p-4 flex flex-row justify-between">
              <span className="font-bold text-xl">Tasks</span>
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
                    showUser={task.User.email}
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default index;
