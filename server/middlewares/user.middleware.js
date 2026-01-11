const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");
const jwt = require("jsonwebtoken");

const allowedTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You dont have perrmision do to this action", 401));
        }

        next();
    }

}


const protect = catchAsync(async (req, res, next) => {

    try {
        const ls = req.cookies?.ls;

        if (!ls) {
            return next(new AppError("User is not login", 400));
        }

        const decode = jwt.verify(ls, process.env.JWT_SECRET);

        if (!decode) {
            return next(new AppError("Ls is not valid", 404))
        }

        const user = await User.findById(decode.id);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user

        next()



    } catch (error) {
        console.log(error);
    }

    


})

module.exports = {
    allowedTo,
    protect
}