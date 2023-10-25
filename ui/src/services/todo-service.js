const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const { post, get, destroy, put } = require("./http-service");

export const newUserRegistration = (userData) => {
  return post(`${apiUrl}/add`, userData);
};
export const userLogin = (userData) => {
  return post(`${apiUrl}/login`, userData);
};

export const adminLogin = (userData) => {
  return post(`${apiUrl}/adminLogin`, userData);
};

export const getAllTasks = () => {
  return get(`${apiUrl}/tasks/all`);
};

export const createNewTask = (newTaskData) => {
  return post(`${apiUrl}/tasks/add`, newTaskData);
};
export const deleteTaskWithId = (id) => {
  return destroy(`${apiUrl}/tasks/delete/${id}`);
};
export const updateTaskWithId = (id, newData) => {
  return put(`${apiUrl}/tasks/update/${id}`, newData);
};

export const getAllUsers = () => {
  return get(`${apiUrl}/user/all`);
};

export const getAllTasksAdminCall = (userId) => {
  return get(`${apiUrl}/tasks/all/admin/${userId}`);
};

export const updateTaskAdminCall = (id, newData) => {
  return put(`${apiUrl}/tasks/update/admin/${id}`, newData);
};

export const deleteTaskWithIdAminCall = (id) => {
  return destroy(`${apiUrl}/tasks/delete/admin/${id}`);
};

export const getAllNotificationAdminCall = () => {
  return get(`${apiUrl}/notification/all`);
};
