const { Task, User } = require("../models/index.js");

const getAllTasks = async (req, res) => {
  const userId = req.params.id;
  try {
    if (userId === "all") {
      let tasks = await Task.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
        ],
      });
      res.send({
        status: true,
        entity: tasks,
      });
    } else {
      let tasks = await Task.findAll({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
        ],
      });
      res.send({
        status: true,
        entity: tasks,
      });
    }
  } catch (err) {
    res.send({
      status: false,
      entity: err,
    });
  }
};

const getAllTasksByUser = async (req, res) => {
  try {
    const reqestedUserId = req.params.id;
    let tasks = await Task.findAll({
      where: { userId: reqestedUserId },
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

const updateTaskByUser = async (req, res) => {
  try {
    const userRole = req.userRoleByToken;

    if (userRole === "admin") {
      const task = await Task.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },

          plain: true,
        }
      );
      res.send({
        status: true,
        entity: task,
      });
    } else {
      res.send({
        status: false,
        entity: "access denied",
      });
    }
  } catch (err) {
    res.send({
      status: false,
      entity: err,
    });
  }
};

const deleteTaskWithId = async (req, res) => {
  const reqestedId = req.params.id;
  const targetData = await Task.findAll({
    where: { id: reqestedId },
  });
  const targetedTaskName = targetData[0].dataValues.taskName;
  await Task.destroy({
    where: {
      id: reqestedId,
    },
  });
  res.send({
    status: true,
    entity: `task name "${targetedTaskName}" deleted successfully`,
  });
};

module.exports = {
  getAllTasks,
  getAllTasksByUser,
  updateTaskByUser,
  deleteTaskWithId,
};
