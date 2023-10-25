const express = require("express");
const notificationRouter = express.Router();
const notificationController = require("../controllers/notificationController.js");
const { auth, authAdmin } = require("../middleware/auth.js");

notificationRouter.use((req, res, next) => {
  next();
});

// //                 -----------------------------------------------
// //   ######---->|     All router start from "/notification" here     |<----######
// //                 -----------------------------------------------

// taskRouter.post("/add", auth, taskController.addTask);
notificationRouter.get(
  "/all",
  authAdmin,
  notificationController.getAllNotification
);
// taskRouter.get("/find/:id", auth, taskController.taskWithId);
// taskRouter.put("/update/:id", auth, taskController.updateTask);
// taskRouter.delete("/delete/:id", auth, taskController.deleteTaskWithId);

module.exports = notificationRouter;
