const ms = require("ms");
const catchAsync = require("../utils/CatchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");


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
    deleteUserById,
    patchUserById,
    getUserById
}