const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");





const sendMail = async (to, subject, htmlBody) => {
    try{
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
            to,
            subject,
            html: htmlBody,
        };
    
        let response = await transporter.sendMail(mailOptions);
        if(response)
            return {statusCode: 200, message: "Email sent successfully"};
        return {statusCode: 400, message: "Email sending failed" };
    }catch(e){
        console.log("Error: ", e);
        return {statusCode: 500, message: "Internel server error"};
    }
}


const generateHash = async (data) => {
    try{
        let salt = await bcrypt.genSalt();
        if(salt){
            let hash = await bcrypt.hash(data, salt);
            if(hash)
                return {statusCode: 200, message: "Hash generated successfully", hash};
            return {statusCode: 400, message: "Cannot generate hash. Please try again"};
        }else{
            return {statusCode: 400, message: "Unexpected error. Please try again"};
        }
    }catch(e){
        console.log("Error: ", e);
        return {statusCode: 500, message: "Internal server error"};
    }
}


const compareHash = async (hash, data) => {
    try{
        let result = await bcrypt.compare(data, hash);
        return {statusCode: 200, result};
    }catch(e){
        console.log("Error: ", e);
        return {statusCode: 500, message: "Internal server error"};
    }
}


const generateToken = async (payload) => {
    try{
        let token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRATION*60});
        if(token)
            return {statusCode: 200, token}
        return {statusCode: 400, message: "Cannot generate token. Please try again"};
    }catch(e){
        console.log("Error: ", e);
        return {statusCode: 500, message: "Internal server error"};
    }
}


const getTokenPayload = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
                if(err)
                    reject({statusCode: 401, message: "Token expired or invalid. Please refresh and try again"});
                resolve({statusCode: 200, payload});
            });
        }catch(e){
            console.log("Error: ", e);
            reject({statusCode: 500, message: "Internal server error"});
        }
    });
}



module.exports = {sendMail, generateHash, compareHash, generateToken, getTokenPayload};