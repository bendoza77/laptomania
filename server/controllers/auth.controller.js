const ms = require("ms");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");


const createSendToken = (user, statusCode, res) => {

    const token = user.signToken();

    const cookieOption = {
        maxAge: ms(process.env.JWT_EXPIRE),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "dev",
        samSite: "Lax"
    }

    user.password = undefined;

    res.cookies("ls", token, cookieOption);

    res.status(statusCode).json({
        status: "succasse",
        message: "User was created! please verify email",
        data: { user }
    })


}

const signup = catchAsync(async (req, res, next) => {

    const { fullname, email, password, phoneNumber, profileImg } = req.body

    if (!fullname || !email || !password || !phoneNumber) {
        return next(new AppError("All field is required", 400));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        profileImg
    })


    createSendToken(user, 201, res);

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

    return res.status(200).send("You login saccessfuly");

})


module.exports = {
    signup,
    login
}