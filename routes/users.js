const router = require("express").Router();
const User = require("../models/users");
const authenticateUser = require("../middleware/authenticateUser");
const { login, signup, verifyEmailExistance, getUserFromToken, resendEmail } = require("../controllers/users");




router.get("/get-user-from-token", authenticateUser, getUserFromToken);
router.post("/signup/verify-email", verifyEmailExistance);
router.post("/signup", signup);
router.get("/resend-mail", authenticateUser, resendEmail);

router.get("/confirm", async (req, res) => {
    try {
        const sessionID = parseInt(req.params.token);

        const user = await User.findOne({ emailVerificationSessionID: sessionID });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if((sessionID+process.env.EXPIRATION_PERIOD) < Date.now()) {
            return res.status(400).json({ message: "Session expired. Please resend email and try again" });
        }

        user.isEmailVerified = true;
        await user.save();

        res.status(200).json({ message: "Email confirmed successfully" });

    } catch (error) {
        console.error("Error confirming email:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/fetch", async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ emailAddress: email });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ ...user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
