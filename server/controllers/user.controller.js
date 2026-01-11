const ms = require("ms");
const catchAsync = require("../utils/CatchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");


const signToken = (id, role) => {

    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
    
}

const createSendToken = (user, statusCode, res) => {

    const token = signToken(user._id, user.role);

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

    const { fullname, email, password, phoneNumber, role, profileImg } = req.body

    if (!fullname || !email || !password || !phoneNumber) {
        return next(new AppError("All field is required", 400));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        role,
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

const deleteUserById = catchAsync(async (req, res, next) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 404))
    }

    const user = await User.findOneAndDelete(id) 

    if (!user) {
        return next(new AppError("User not found", 404))
    }

    return res.status(200).send("User is deleted");


})

const patchUserById = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const { fullname, email, password, phoneNumber } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 404))
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (password) user.password = password
    if (phoneNumber) user.phoneNumber = phoneNumber

    return res.status(200).send("User information has changed");

})

const getUserById = catchAsync(async (req, res, next) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 404))
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    return res.json(user);


})


module.exports = {
    signup, 
    login,
    deleteUserById,
    patchUserById,
    getUserById
}