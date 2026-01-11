const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: [true, "User fullename is required"]
    },

    email: {
        type: String,
        require: [true, "User email is required"],
        unique: [true, "User email must be unique"]
    },

    password: {
        type: String,
        require: [true, "User password is required"],
        minlength: 5,
        maxlength: 20,
    },

    profileImg: String,

    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        require: [true, "User role is required"],
        default: "user"
    },

    phoneNumber: {
        type: String,
        require: [true, "User phone number is required"],
        unique: [true, "User phone number must be unique"]
    }


})

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

const User = mongoose.model("Users", userSchema);

module.exports = User;