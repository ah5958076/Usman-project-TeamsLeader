const router = require("express").Router();
const authenticateUser = require("../middleware/authenticateUser");
const { 
    login, 
    signup, 
    verifyEmailExistance, 
    getUserFromToken, 
    resendEmail, 
    confirmEmail 
} = require("../controllers/users");




router.get("/get-user-from-token", authenticateUser, getUserFromToken);
router.post("/signup/verify-email", verifyEmailExistance);
router.post("/signup", signup);
router.get("/resend-mail", authenticateUser, resendEmail);
router.get("/confirm", authenticateUser, confirmEmail);
router.get("/login", login);


module.exports = router;
