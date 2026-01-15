const { default: mongoose } = require("mongoose");
const Laptop = require("../models/laptop.model");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const imageUpload = require("../utils/images");

const getLaptops = catchAsync(async (req, res, next) => {
    const laptops = await Laptop.find();
    return res.json(laptops);
})

const getLaptopById = catchAsync( async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 400));
    }

    const laptop = await Laptop.findById(id);

    if (!laptop) {
        return next(new AppError("Laptop not found", 404));
    }

    return res.json(laptop);

})

const createLaptop = catchAsync( async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
        return next(new AppError("At least one image is required", 400));
    }

    const data = req.body;
    const images = req.files.map(el => el.path);
    const result = await imageUpload("laptops", images);
    const imageUrls = result.map(el => el.secure_url)

    data.images = imageUrls;
    const property = ["brand", "model", "processor", "images", "ram", "storage", "price", 
        "graphicsCard", "screenSize",];

    const keys = Object.keys(data);
    const check = property.every(el => keys.includes(el));

    if (!check) {
        return next(new AppError("All field is required"));
    }


    const newLaptop = await Laptop.create(data);

    return res.json(newLaptop);

})

const deleteLaptopById = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 400));
    }

    const laptop = await Laptop.findById(id);

    if (!laptop) {
        return next(new AppError("Laptop not found", 404));
    }

    await Laptop.findByIdAndDelete(id);

    return res.send("Laptop is deleted");

})

const patchLaptopById = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const data = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 400));
    }

    const laptop = await Laptop.findById(id);

    if (!laptop) {
        return next(new AppError("Laptop not found", 404));
    }

    for (const [ key, value ] of Object.entries(data)) {
        if (value !== "") {
            laptop[key] = value
        }
    }

    await laptop.save({validateBeforeSave: false});
    return res.send(laptop);

})

module.exports = {
    getLaptopById,
    getLaptops,
    createLaptop,
    deleteLaptopById,
    patchLaptopById
}