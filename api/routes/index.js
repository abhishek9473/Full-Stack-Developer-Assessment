const express = require("express");
const app = express.Router();
const loginController = require("../controllers/loginController.js");

app.use((req, res, next) => {
  next();
});

// //              |-----------------------------------------------|
// //   ######---->|     All router start from "/" (home) here     |<----######
// //              |-----------------------------------------------|

// // https://localhost:3000/...

app.get("/", (req, res) => {
  res.send("hello this is API homepage , welcome");
});

// // add user in databse and login from database
app.post("/add", loginController.addUser);
app.post("/login", loginController.loginUser);
app.post("/adminLogin", loginController.adminLogin);

app.use("/user", require("./userRouter"));
app.use("/tasks", require("./taskRouter"));
app.use("/notification", require("./notificationRouter.js"));

module.exports = app;
