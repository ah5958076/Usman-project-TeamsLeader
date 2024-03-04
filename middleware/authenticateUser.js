const { getTokenPayload } = require("../helpers/general");




const authenticateUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res.status(401).send({ message: "Authentication Failed" });
    const result = await getTokenPayload(token);
    if(result.statusCode===200){
      req.user = result.payload;
      return next();
    }else{
      return res.status(401).json({message: "Authentication Failed"});
    }
  } catch (error) {
    console.log("Error: ", error);
    if(error.statusCode)
      return res.status(error.statusCode).send({ message: error.message });
    return res.status(500).send({ message: "Internal server error" });
  }
};


module.exports = authenticateUser;
