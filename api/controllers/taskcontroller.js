const db = require("../models/index.js");
const { Task, User, Notification } = require("../models/index.js");
const { getIO } = require("../socket.js"); // Import the getIO function
const io = getIO();

const getAllTasks = async (req, res) => {
  try {
    const targetUserId = req.userIdFromReq;
    let tasks = await Task.findAll({
      where: { userId: targetUserId },
      order: [["createdAt", "DESC"]],
    });

    res.send({
      status: true,
      entity: tasks,
    });
  } catch (err) {
    res.send({
      status: false,
      entity: err,
    });
  }
};

const taskWithId = async (req, res) => {
  // let tasks = await Task.findAll({
  //   where: { id: req.params.id },
  // });
  // res.send(tasks);
  res.status(200);
};

const addTask = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const targetUserId = req.userIdFromReq;
    const newTaskData = {
      userId: targetUserId,
      taskName: req.body.taskName,
      taskDiscription: req.body.taskDiscription,
    };
    const newTask = await Task.create(newTaskData, { transaction: t });

    const user = await User.findOne({
      where: { id: targetUserId },
    });

    const newNotification = await Notification.create(
      {
        userId: targetUserId,
        taskId: newTask.id,
        taskType: "new",
      },
      { transaction: t }
    );

    const newNotificatonObj = {
      Task: {
        taskName: newTask.taskName,
        taskDiscription: newTask.taskDiscription,
        createdAt: newTask.createdAt,
      },
      User: { email: user.email },
      createdAt: newNotification.createdAt,
      id: newNotification.id,
      taskId: newNotification.taskId,
      taskType: newNotification.taskType,
      updatedAt: newNotification.updatedAt,
      userId: newNotification.userId,
    };

    io.emit("newNotification", newNotificatonObj);
    io.emit("newNotificationAlert", "new activity found");

    res.send({
      status: true,
      entity: `${newTask.taskName} added to databse`,
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    res.send({
      status: false,
      entity: err,
    });
  }
};

const deleteTaskWithId = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const targetUserId = req.userIdFromReq;
    const reqestedId = req.params.id;
    const targetData = await Task.findAll({
      where: { id: reqestedId },
    });
    const targetedTaskName = targetData[0].dataValues.taskName;
    await Task.destroy(
      {
        where: {
          id: reqestedId,
        },
      },
      { transaction: t }
    );

    const user = await User.findOne({
      where: { id: targetUserId },
    });

    const newNotification = await Notification.create(
      {
        userId: targetUserId,
        taskId: req.params.id,
        taskType: "delete",
      },
      { transaction: t }
    );

    const newNotificatonObj = {
      Task: null,
      User: { email: user.email },
      createdAt: newNotification.createdAt,
      id: newNotification.id,
      taskId: newNotification.taskId,
      taskType: newNotification.taskType,
      updatedAt: newNotification.updatedAt,
      userId: newNotification.userId,
    };

    io.emit("newNotification", newNotificatonObj);
    io.emit("newNotificationAlert", "new activity found");

    // console.log("values", targetData[0].dataValues.taskName);
    res.send(`task name "${targetedTaskName}" deleted successfully`);
    await t.commit();
  } catch (error) {
    await t.rollback();

    res.send({
      status: false,
      entity: `delete task try-catch error : ${error}`,
    });
  }
};

const updateTask = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const targetUserId = req.userIdFromReq;
    const taskNewData = req.body;
    const task = await Task.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
          userId: targetUserId,
        },

        plain: true,
      },
      {
        transaction: t,
      }
    );

    const newNotification = await Notification.create(
      {
        userId: targetUserId,
        taskId: req.params.id,
        taskType: "update",
      },
      { transaction: t }
    );
    const user = await User.findOne({
      where: { id: targetUserId },
    });

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const newNotificatonObj = {
      Task: {
        taskName: taskNewData.taskName,
        taskDiscription: taskNewData.taskDiscription,
        createdAt: formattedTime,
      },
      User: { email: user.email },
      createdAt: newNotification.createdAt,
      id: newNotification.id,
      taskId: newNotification.taskId,
      taskType: newNotification.taskType,
      updatedAt: newNotification.updatedAt,
      userId: newNotification.userId,
    };

    io.emit("newNotification", newNotificatonObj);
    io.emit("newNotificationAlert", "new activity found");

    res.send({
      status: true,
      entity: task,
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    res.send({
      status: false,
      entity: err,
    });
  }
};

module.exports = {
  getAllTasks,
  taskWithId,
  addTask,
  deleteTaskWithId,
  updateTask,
};
