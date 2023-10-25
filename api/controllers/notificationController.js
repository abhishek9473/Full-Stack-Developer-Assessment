const db = require("../models/index.js");
const { Task, User, Notification } = require("../models/index.js");

const getAllNotification = async (req, res) => {
  try {
    const targetUserId = req.userIdFromReq;
    let notification = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["email"],
        },
        {
          model: db.Task,
          attributes: ["taskName", "taskDiscription", "createdAt"],
        },
      ],
    });

    res.send({
      status: true,
      entity: notification,
    });
  } catch (err) {
    res.send({
      status: false,
      entity: err,
    });
  }
};

module.exports = {
  getAllNotification,
};
