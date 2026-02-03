const { signup, login, authLogin, logout, verifyEmail } = require("../controllers/auth.controller");
const express = require("express");
const protect = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/autho-login", protect, authLogin);

authRouter.post("/logout", protect, logout);

authRouter.post("verify/:code", protect, verifyEmail);

module.exports = authRouter