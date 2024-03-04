const { sendMail } = require("../helpers/general");
const fs = require("fs")
const path = require("path")
const User = require("../models/users");




const verifyEmailExistance = async (req, res) => {
    try{
        let {emailAddress} = req.body;

        let user = await User.findOne({ emailAddress });
        if(user)
            return res.status(201).json({message: "User with given email already exists"});
        return res.status(200).json({message: "No user exists with this email"});

    }catch(err){   
        console.log("Error: ", err);
        return res.status(500).json({message: "Internal server error"});
    }
}


const signup = async (req, res) => {
    try {
        const { fullName, emailAddress, accountName } = req.body;

        if(!fullName)   
            return res.status(201).send({message: "Fullname not found"});
        if(!emailAddress)   
            return res.status(201).send({message: "Email address not found"});
        if(!accountName)   
            return res.status(201).send({message: "Account Name not found"});


        let user = await User.findOne({ emailAddress });
        if (user)
            return res.status(400).json({ message: "Sorry, a user with this email already exists" });


        let sessionID = Date.now();
        let new_user = new User({ emailAddress, fullName, accountName, emailVerificationSessionID: sessionID });
        await new_user.save();


        let htmlContent = fs.readFileSync(path.join(__dirname, "../helpers/index.html"), "utf-8");
        htmlContent = htmlContent
            .replace("{{userFullName}}", fullName)
            .replace("{{confirmationToken}}", sessionID); 


        let response = await sendMail(emailAddress, "Email Verification from TeamsLeader", htmlContent);        
        res.status(response.statusCode).json({message: response.message});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const login = (req, res) => {

}


const validateToken = (req, res) => {

}


const resendEmail = (req, res) => {

}



module.exports = {verifyEmailExistance, signup, login, validateToken, resendEmail}