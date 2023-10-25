const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskcontroller.js");
const {auth, authAdmin} = require("../middleware/auth.js");
const taskControllerByAdmin = require("../controllers/taskControllerByAdmin.js");

taskRouter.use((req, res, next) => {
  next();
});

// //               -----------------------------------------------
// //   ######---->|     All router start from "/tasks" here     |<----######
// //               -----------------------------------------------

taskRouter.get("/", (req, res) => {
  res.send("task homepage");
});

taskRouter.post("/add", auth, taskController.addTask);
taskRouter.get("/all",auth, taskController.getAllTasks);
taskRouter.get("/find/:id", auth, taskController.taskWithId);
taskRouter.put("/update/:id", auth, taskController.updateTask);
taskRouter.delete("/delete/:id", auth, taskController.deleteTaskWithId);

taskRouter.get("/all/admin/:id",authAdmin,taskControllerByAdmin.getAllTasks );
taskRouter.get("/all/admin/user/:id",authAdmin, taskControllerByAdmin.getAllTasksByUser );
taskRouter.put("/update/admin/:id", authAdmin, taskControllerByAdmin.updateTaskByUser);
taskRouter.delete("/delete/admin/:id", authAdmin, taskControllerByAdmin.deleteTaskWithId);


module.exports = taskRouter;
