const cors = require("cors");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("./socket.js").initializeSocket(server);

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = 3000;

// // ---> this is router homepage <--- // //
app.use("/", require("./routes/index.js"));


// if route not found
app.use((req, res, next) => {
  res.send({
    status: false,
    message: "Path not find",
  });
  next();
});

// // sequelize file imported(models file)
require("./models/index");
server.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});
