const express = require("express");
const { getUserById, patchUserById, deleteUserById } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");
const allowedTo = require("../middlewares/roles.middleware");
const { addCart } = require("../controllers/auth.controller");


const userRouter = express.Router();

userRouter.get("/:id", protect, getUserById);

userRouter.delete("/:id", protect, allowedTo("user"), deleteUserById);

userRouter.patch("/:id", protect, allowedTo("user"), patchUserById);

module.exports = userRouter