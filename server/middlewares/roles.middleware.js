const AppError = require("../utils/AppError");

const allowedTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.join(" ").includes(req.user.role)) {
            return next(new AppError("You dont have perrmision do to this action", 401));
        }

        next();
    }

}

module.exports = allowedTo