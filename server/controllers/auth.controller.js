const ms = require("ms");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");


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

module.exports = {
    signup,
    login,
    authLogin,
    logout
}