import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import Navbar from "@/components/Navbar";
import NotificationIcon from "@/components/childrenComponent/NotificationIcon";
import NotificationListArea from "@/components/childrenComponent/NotificationListArea";
import NotificationTaskDetail from "@/components/childrenComponent/NotificationTaskDetail";
import { localTime } from "@/components/functions/localTimeConverter";
import Modal from "@/components/uiComponents/Modal";
import { getAllNotificationAdminCall } from "@/services/todo-service";

function notification() {
  const [pageReady, setPageReady] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [taskDetail, setTaskDetail] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);

  // api call
  useEffect(() => {
    getAllNotificationAdminCall().then((res) => {
      if (res.status) {
        setNotificationData(res.entity);
        setPageReady(true);
      }
    });
  }, []);

  // Socket io connection
  useEffect(() => {
    const socket = io(apiUrl);
    socket.on("newNotification", (data) => {
      socketDataHandler(data);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const objectFilter = (id) => {
    // this find meathod need to review
    const foundObject = notificationData.find((item) => item.taskId === id);
    const taskTime = localTime(foundObject?.Task?.createdAt);
    const newObj = {
      taskAction: foundObject?.taskType,
      userEmail: foundObject?.User.email,
      date: taskTime,
      taskName: foundObject?.Task?.taskName,
      taskDiscription: foundObject?.Task?.taskDiscription,
    };
    return newObj;
  };

  const showNotificationDetailHandler = (id) => {
    const newObj = objectFilter(id);
    setTaskDetail(newObj);
    setShowTaskModal(true);
  };

  const modalCloser = () => {
    setShowTaskModal(false);
  };

  // console.log("qqq",notificationData);

  const socketDataHandler = (newData) => {
    setNotificationData((prevData) => {
      // Combine the new data with the existing data
      const updatedData = [newData, ...prevData];
      // console.log("socket data == :", updatedData);
      return updatedData;
    });
  };

  return (
    <>
      <Modal isOpen={showTaskModal} onClose={modalCloser}>
        <NotificationTaskDetail data={taskDetail} modalCloser={modalCloser} />
      </Modal>
      <Navbar notificationArea={<NotificationIcon />} role={"Admin"} />
      <div className="w-full md:px-20 px-4 mt-5 mx-auto">
        <div className="border rounded-lg shadow">
          <div className="bg-slate-100 p-4 flex flex-row justify-between">
            <span className="font-bold text-xl">Notification</span>
          </div>
          {pageReady &&
            notificationData?.map((user, i) => (
              <NotificationListArea
                key={i}
                data={user}
                click={showNotificationDetailHandler}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default notification;
