const express = require("express");
const { signup, login, getUserById, patchUserById, deleteUserById } = require("../controllers/user.controller");
const upload = require("../config/uploadImages");const { protect, allowedTo } = require("../middlewares/user.middleware");
;

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profileImg"), signup);

userRouter.post("/login", login);

userRouter.get("/:id", getUserById);

userRouter.delete("/:id", protect, allowedTo("user"), deleteUserById);

userRouter.patch("/:id", protect, allowedTo("user"), patchUserById);

module.exports = userRouter