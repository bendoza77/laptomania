const { signup, login, authLogin, logout } = require("../controllers/auth.controller");
const express = require("express");
const protect = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/autho-login", protect, authLogin);

authRouter.post("/logout", protect, logout);

module.exports = authRouter