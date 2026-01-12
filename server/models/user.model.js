const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: [true, "User fullname is required"],
        lowercase: true
    },

    email: {
        type: String,
        require: [true, "User email is required"],
        validate: [validator.isEmail, "Please provide valid email"],
        unique: [true, "User email must be unique"],
        lowercase: true
    },

    password: {
        type: String,
        require: [true, "User password is required"],
        minlength: 5,
        maxlength: 20,
        Selection: false
    },

    role: {
        type: String,
        enum: ["user", "amdin", "moderator"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.methods.comparePassword = async (candidate, password) => {

    return await bcrypt.compare(candidate, password);

}

userSchema.methods.signToken = function () {
    return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
}

const User = mongoose.model("Users", userSchema);

module.exports = User;