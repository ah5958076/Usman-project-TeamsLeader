var jwt = require("jsonwebtoken");
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

const fetchAdmin = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  let token = req.header("admin-token");
  if (!token) {
    res
      .status(401)
      .send({ message: "Please authenticate using a valid token...." });
  }
  try {
    const data = jwt.verify(token, ADMIN_SECRET_KEY);
    req.student = data.student;
    next();
  } catch (message) {
    res.status(401).send({ message: "Please authenticate using a valid token" });
  }
};

module.exports = fetchAdmin;
