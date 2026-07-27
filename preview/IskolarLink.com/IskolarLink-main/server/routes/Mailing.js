
const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { Users, OTP } = require('../models');

const transporter = nodemailer.createTransport({
    host: 'mail.iskolarlink.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'otp@iskolarlink.com',
        pass: 'SEadj9@Y-Z[a'
    }
});



router.use(cors(
    {
        origin: ['http://localhost:3000', 'https://iskolarlink.netlify.app', 'https://www.iskolarlink.com','https://iskolarlink.com/','https://iskolarlink.com'],
    credentials: true
    }
));

router.post('/send_test_email', async (req, res) => {
    

    const {email} = req.body;
    const mailOptions = {
        from: 'otp@iskolarlink.com',
        to: email,
        subject: 'Test Email',
        text: 'This is a test email',
        html: '<h1>This is a test email</h1>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.json({error: `mailing error: ${error}`});
        }else{
            console.log('Email sent: ' + info.response);
            res.json({success: 'Email sent'});
        }
    });

});

router.post("/test", async (req, res) => {
    res.json({success: "test"});
});


router.post('/send_forgot_password', async (req, res) => {
    const {email} = req.body;
    //check if email exists in database
    const user = await Users.findOne({
        where: {email: email}
    });

    if(!user){
        res.json({error: 'Email does not exist'});
        return;
    }

    // Check if there is an existing OTP for this email
    const otp = await OTP.findOne({
        where: {email: email}
    });

    if(otp){
        //delete existing OTP
        await OTP.destroy({
            where: {email: email}
        });
    }
    
    //generate 6 alphanumeric code and check first if it exists in OTP table
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let exists = true;

    while(exists){
        for(let i = 0; i < 6; i++){
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const otp = await OTP.findOne({
            where: {code: code}
        });
        if(!otp){
            exists = false;
        }
    }

    //insert code in OTP table
    await OTP.create({
        email: email,
        code: code
    });

    //construct a proper mailOptions
    const mailOptions = {
        from: 'otp@iskolarlink.com',
        to: email,
        subject: 'Password Reset Request',
        html: `
                    <h1>Password Reset Request</h1>
                    <p>We received a request to reset your password for your IskolarLink account. To proceed with the password reset, click the following link:</p>
                    <p><a href="https://iskolarlink.com/forgot_password/${email}/${code}">Reset Password</a></p>
                    <p>If you did not request this password reset or have any concerns, please disregard this email. Your account security is important to us.</p>
                    <p>Thank you for using IskolarLink.</p>
        `,
    };

    //send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.status(500).json({error: `mailing error: ${error}`});
        }else{
            console.log('Email sent: ' + info.response);
            res.status(200).json({success: 'Email sent. Please check your email for further instructions. If you did not receive an email, please check your spam/junk folder.'});
        }
    });

    return

});

router.post('/send_verification', async (req, res) => {
    const {email} = req.body;
    //check if email exists in database
    const user = await Users.findOne({
        where: {email: email}
    });

    if(user){
        res.json({error: 'Email already exists'});
        return;
    }

    // Check if there is an existing OTP for this email
    const otp = await OTP.findOne({
        where: {email: email}
    });

    if(otp){
        //delete existing OTP
        await OTP.destroy({
            where: {email: email}
        });
    }

    //generate 6 alphanumeric code and check first if it exists in OTP table
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let exists = true;

    while(exists){
        for(let i = 0; i < 4; i++){
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const otp = await OTP.findOne({
            where: {code: code}
        });
        if(!otp){
            exists = false;
        }
    }

    //insert code in OTP table
    await OTP.create({
        email: email,
        code: code
    });

    //construct a proper mailOptions
    const mailOptions = {
        from: 'otp@iskolarlink.com',
        to: email,
        subject: 'Email Verification',
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #555;
                    }
                    a {
                        color: #007BFF;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Email Verification</h1>
                    <p>Thank you for signing up for IskolarLink! To verify your email, Input the following code:</p>
                    <p style="font-size: 20px; font-weight: bold;">${code}</p>
                    <p>If you did not sign up for IskolarLink, please disregard this email.</p>
                    <p>Thank you for using IskolarLink.</p>
                </div>
            </body>
            </html>
        `,
    };

    //send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.json({error: `mailing error: ${error}`});
        }else{
            console.log('Email sent: ' + info.response);
            res.json({success: 'Email sent. Please check your email for further instructions. If you did not receive an email, please check your spam/junk folder.', code: code});
        }
    });

    res.json({success: 'Email sent. Please check your email for further instructions. If you did not receive an email, please check your spam/junk folder.', code: code});

});


router.post('/resend_verification', async (req, res) => {
    const {email} = req.body;

    // Check if there is an existing OTP for this email
    const otp = await OTP.findOne({
        where: {email: email}
    });

    if(otp){
        //delete existing OTP
        await OTP.destroy({
            where: {email: email}
        });
    }

    //generate 6 alphanumeric code and check first if it exists in OTP table
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let exists = true;

    while(exists){
        for(let i = 0; i < 4; i++){
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const otp = await OTP.findOne({
            where: {code: code}
        });
        if(!otp){
            exists = false;
        }
    }

    //insert code in OTP table
    await OTP.create({
        email: email,
        code: code
    });

    //construct a proper mailOptions
    const mailOptions = {
        from: 'otp@iskolarlink.com',
        to: email,
        subject: 'Email Verification',
        html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333;">Email Verification</h1>
                <p style="color: #555;">Thank you for signing up for IskolarLink! To verify your email, input the following code:</p>
                <p style="font-size: 20px; font-weight: bold;">${code}</p>
                <p style="color: #555;">If you did not sign up for IskolarLink, please disregard this email.</p>
                <p style="color: #555;">Thank you for using IskolarLink.</p>
            </div>
        </div>`,
    };

    //send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.status(500).json({error: `mailing error: ${error}`});
        }else{
            console.log('Email sent: ' + info.response);
            res.status(200).json({success: 'Email sent. Please check your email for further instructions. If you did not receive an email, please check your spam/junk folder.', code: code});
        }
    });

    return

});






module.exports = router;
