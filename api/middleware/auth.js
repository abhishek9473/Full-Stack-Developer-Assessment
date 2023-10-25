require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const userData = jwt.verify(token, secretKey);
    req.userIdFromReq = userData.id;
    next();
  } catch (error) {
    console.log("error in auth page", error);
    res.send({
      status: false,
      entity: "token is missing or invalid",
    });
  }
};

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  if (!authHeader) {
    return res.send({
      status: false,
      entity: "token missing",
    });
  }
  const token = await authHeader;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role === "admin") {
      req.userRoleByToken = decoded.role;
      next();
    } else {
      res.send({
        status: false,
        entity: "access denied",
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      entity: "Invalid authorization token",
      error,
    });
  }
};

module.exports = { auth, authAdmin };
