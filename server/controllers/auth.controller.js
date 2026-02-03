const ms = require("ms");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const sendEmail = require("../utils/email");


const createSendToken = (user, message, statusCode, res) => {

    const token = user.signToken();

    const cookieOption = {
        maxAge: ms(process.env.JWT_EXPIRE),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "dev",
        samSite: "Lax"
    }

    user.password = undefined;

    res.cookie("ls", token, cookieOption);

    res.status(statusCode).json({
        status: "succasse",
        message: message,
        data: { user }
    })


}

const signup = catchAsync(async (req, res, next) => {
    const { fullname, email, password, phoneNumber } = req.body

    if (!fullname || !email || !password || !phoneNumber) {
        return next(new AppError("All field is required", 400));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
    })

    const code = user.createVerificationCode();
    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;

    const designe = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007bff;">
                <h2 style="color: #333; margin: 0;">Email Verification</h2>
                <p style="color: #666; margin: 5px 0 0 0;">Secure Your Account</p>
            </div>
            <div style="padding: 30px 0;">
                <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello,</p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">Thank you for signing up! Please verify your email address by clicking the button below to activate your account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="
                        display: inline-block;
                        padding: 12px 32px;
                        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        font-size: 16px;
                        transition: transform 0.2s;
                    ">
                        ✓ Verify Email
                    </a>
                </div>
                <p style="color: #888; font-size: 14px; text-align: center;">Or copy this link: <span style="word-break: break-all; color: #007bff;">${url}</span></p>
            </div>
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <p style="color: #856404; margin: 0; font-size: 14px;"><strong>Security Notice:</strong> If you didn't create this account, please ignore this email.</p>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                <p style="margin: 5px 0;">© 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    `

    sendEmail(email, "Verify email", designe);
    createSendToken(user, "User was created! please verify email", 201, res);

})

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError("Email and Password required", 400));
    }

    const user = await User.findOne({email: email}).select("+password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    const isCorrect = await user.comparePassword(password, user.password);


    if (!isCorrect) {
        return next(new AppError("Email or Password is incorrect", 404));
    }


    createSendToken(user, "User login successfull", 200, res);

})


const authLogin = catchAsync(async (req, res, next) => {

    const { user } = req;

    if (user) {
        return res.json({
            status: "succasse",
            data: { user }
        }) 
    }

    res.json({
        status: "failed",
        message: "User is not login"
    });


})

const logout = catchAsync(async (req, res, next) => {

    res.clearCookie("ls", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "dev",
        samSite: "Lax"
    })

    return res.json({
        message: "You logout from your accounte"
    })

})

const verifyEmail = catchAsync(async (req, res, next) => {

    const { code } = req.params;

    const user = await User.findOne({verificationCode: code});

    if (!user) return next(new AppError("User not found", 404));

    user.verificationCode = undefined;
    user.isVerified = true;
    user.save({validateBeforeSave: true});


})

module.exports = {
    signup,
    login,
    authLogin,
    logout,
    verifyEmail
}