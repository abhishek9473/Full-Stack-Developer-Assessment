import Navbar from "@/components/Navbar";
import NotificationIcon from "@/components/childrenComponent/NotificationIcon";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function AdminLayout({ children }) {
  const router = useRouter();

  const [newAlert, setNewAlert] = useState(false);

  // Socket io connection
  useEffect(() => {
    const socket = io(apiUrl);
    socket.on("newNotificationAlert", (data) => {
      setNewAlert(true);
    });
    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const notificationIconClickHandler = () => {
    setNewAlert(false);
    router.push("/admin/notification");
  };

  return (
    <>
      <Navbar
        notificationAreaclick={notificationIconClickHandler}
        notificationArea={<NotificationIcon hasNewNotification={newAlert} />}
        role={"Admin"}
      />
      {children}
    </>
  );
}

export default AdminLayout;
