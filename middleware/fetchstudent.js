var jwt = require("jsonwebtoken");
const STD_SECRET_KEY = process.env.STD_SECRET_KEY;

const fetchstudent = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  let token = req.header("std-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate using a valid token...." });
  }
  try {
    const data = jwt.verify(token, STD_SECRET_KEY);
    req.student = data.student;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchstudent;
