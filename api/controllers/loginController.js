require("dotenv").config();
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.User;
const secretKey = process.env.SECRET_KEY;

const addUser = async (req, res) => {
  try {
    const newUserEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (!newUserEmail) {
      const salt = await bcrypt.genSalt(10);
      const reqData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      };
      const newUser = await User.create(reqData);
      token = jwt.sign(
        { id: newUser.id, email: newUser.email, name: newUser.name },
        secretKey
      );

      res.send({
        status: true,
        entity: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          token,
        },
      });
    } else {
      res.send({
        status: false,
        entity: "email already added",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      entity: "error in adding user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  // pass user detail in json format
  // { "email": "sample@gmail.com" , "password" : "sample"}
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("login page user data", user);
    if (user) {
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordValid) {
        token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          secretKey
        );
        res.send({
          status: true,
          entity: {
            id: user.id,
            email: user.email,
            name: user.name,
            token,
          },
        });
      } else {
        res.send({
          status: false,
          entity: "Incorrect password",
        });
      }
    } else {
      res.send({
        status: false,
        entity: "Invalid email",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      entity: "error in login cotrolller",
      error,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      if (user.role == "admin") {
        const passwordValid = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (passwordValid) {
          token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
            secretKey
          );
          res.send({
            status: true,
            entity: {
              id: user.id,
              email: user.email,
              name: user.name,
              token,
            },
          });
        } else {
          res.send({
            status: false,
            entity: "Incorrect password",
          });
        }
      } else {
        res.send({
          status: false,
          entity: "unauthorize email",
        });
      }
    } else {
      res.send({
        status: false,
        entity: "Invalid email",
      });
    }
    // console.log("login page user data", user);
  } catch (error) {
    res.send("error found");
  }
};

module.exports = {
  addUser,
  loginUser,
  adminLogin,
};
