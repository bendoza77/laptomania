const cloudinary = require("../config/cloudinary.js");
const fs = require('fs');


const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "image",
    quality: "auto",
    format: "webp",
    transformation: [
        { width: 500, height: 500, crop: "fit", gravity: "center" }
    ]
}

const imageUpload = async (folder, files) => {
    try {
        const uploadedPrimes = files.map(file => cloudinary.uploader.upload(file, {...options, folder}));

        const result = await Promise.all(uploadedPrimes);

        return result;
    } catch(err) {
       return { message: "Error uploading image", error: err.message };
    }
}

const deleteImage = async (publicId) => {
    try {

        const result = await cloudinary.uploader.destroy(publicId);
        return result;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    imageUpload,
    deleteImage
}