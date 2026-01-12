const upload = require("../config/uploadImages");
const { signup, login } = require("../controllers/auth.controller");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profileImg"), signup);

authRouter.post("/login", login);

module.exports = authRouter