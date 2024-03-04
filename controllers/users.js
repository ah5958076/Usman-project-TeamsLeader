const { sendMail,generateHash, generateToken } = require("../helpers/general");
const fs = require("fs")
const path = require("path")
const User = require("../models/users");




const getUserFromToken = async (req, res) => {
    try{
        let emailAddress = req.user.emailAddress;
        let user = await User.findOne({emailAddress});
        return res.status(200).json({...user});
    }catch(e){
        console.log("Error: ", e);
        return res.status(500).json({message: "Internal server error"});
    }
}


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
        const { fullName, emailAddress, password, accountName } = req.body;

        if(!fullName)   
            return res.status(201).send({message: "Fullname not found"});
        if(!emailAddress)   
            return res.status(201).send({message: "Email address not found"});
        if(!password)   
            return res.status(201).send({message: "Password not found"});
        if(!accountName)   
            return res.status(201).send({message: "Account Name not found"});


        let user = await User.findOne({ emailAddress });
        if (user)
            return res.status(400).json({ message: "User with this email already exists" });


        let result = await generateHash(password);
        if(result.statusCode!==200)
            return res.status(result.statusCode).json({message: result.message});


        let sessionID = Date.now();
        let userData = {
            emailAddress,
            fullName,
            accountName,
            password: result.hash,
            emailVerificationSessionID: sessionID
        };
        let new_user = new User(userData);
        result = await new_user.save();
        if(!result)
            return res.status(500).json({ message: "Internal server error" });

        let tokenResult = await generateToken({emailAddress});
        if(tokenResult.statusCode!==200)
            return res.status(tokenResult.statusCode).json({ message: tokenResult.message });


        let htmlContent = fs.readFileSync(path.join(__dirname, "../helpers/index.html"), "utf-8");
        htmlContent = htmlContent
            .replace("{{userFullName}}", fullName)
            .replace("{{confirmationToken}}", sessionID); 


        let response = await sendMail(emailAddress, "Email Verification from TeamsLeader", htmlContent);        
        return res.status(response.statusCode).json({message: response.message, token: tokenResult.token});
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const login = (req, res) => {

}


const validateToken = (req, res) => {

}


const resendEmail = async (req, res) => {
    let emailAddress = req.user.emailAddress;

    let user = await User.findOne({emailAddress});
    if(!user)
        return res.status(400).json({message: "User not found"});

    let sessionID = Date.now();

    user.emailVerificationSessionID=sessionID;
    let result = await user.save();
    if(!result.isModified){
        return res.status(400).json({message: "Unexpected error occured. Please try again"});
    }

    let htmlContent = fs.readFileSync(path.join(__dirname, "../helpers/index.html"), "utf-8");
        htmlContent = htmlContent
            .replace("{{userFullName}}", user.fullName)
            .replace("{{confirmationToken}}", sessionID); 


        let response = await sendMail(emailAddress, "Email Verification from TeamsLeader", htmlContent);        
        return res.status(response.statusCode).json({message: response.message});
}



module.exports = {getUserFromToken, verifyEmailExistance, signup, login, validateToken, resendEmail}