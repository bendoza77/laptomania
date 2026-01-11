const express = require("express");
const { getLaptops, getLaptopById, createLaptop, deleteLaptopById, patchLaptopById } = require("../controllers/laptop.controller");
const upload = require("../config/uploadImages");
const { protect, allowedTo } = require("../middlewares/user.middleware");

const laptopRouter = express.Router();

laptopRouter.get("/", getLaptops);

laptopRouter.get("/:id", getLaptopById);

laptopRouter.post("/", protect, allowedTo("amdin"), upload.array("images", 4), createLaptop);

laptopRouter.delete("/:id", protect, allowedTo("admin, moderator"), deleteLaptopById);

laptopRouter.patch("/:id", protect, allowedTo("admin, moderator"), patchLaptopById);

module.exports = laptopRouter