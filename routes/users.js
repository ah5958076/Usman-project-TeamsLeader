const router = require("express").Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const User = require("../models/users");




router.post("/signup", async (req, res) => {
    try {
        const { fullName, emailAddress, accountName } = req.body;
        let user = await User.findOne({ emailAddress });
        if (user) {
            return res
                .status(400)
                .json({ error: "Sorry, a user with this email already exists" });
        }

        let sessionID = Date.now();
        let new_user = new User({ emailAddress, fullName, accountName, emailVerificationSessionID: sessionID });
        await new_user.save();

        const htmlContent = fs.readFileSync(path.join(__dirname, "../helpers/index.html"), "utf-8");
        htmlContent = htmlContent
            .replace("{{userFullName}}", fullName)
            .replace("{{confirmationToken}}", sessionID); 

        const transporter = nodemailer.createTransport({
            host: "mail.teamsleader.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: emailAddress,
            subject: "Email address confirmation",
            html: htmlContent,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log({ error });
                res.status(404).json({ message: "Email sending failed" });
            } else {
                res.status(200).json({message: "User registered successfully"});
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

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
