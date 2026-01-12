const express = require("express");
const { getUserById, patchUserById, deleteUserById } = require("../controllers/user.controller");
const { protect, allowedTo } = require("../middlewares/user.middleware");
;

const userRouter = express.Router();

userRouter.get("/:id", getUserById);

userRouter.delete("/:id", protect, allowedTo("user"), deleteUserById);

userRouter.patch("/:id", protect, allowedTo("user"), patchUserById);

module.exports = userRouter