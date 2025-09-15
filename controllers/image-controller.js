const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");

const uploadImage = async (req, res) => {
  try {
    // check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded, please provide a image",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image url and public id along with the uploaded user id
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.id,
    });

    await newlyUploadedImage.save();

    // Clean up the uploaded file from the server
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: newlyUploadedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again later.",
    });
  } finally {
    // Ensure the file is deleted even if an error occurs after upload
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json({
      success: true,
      message: "Images fetched successfully",
      data: images,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again later.",
    });
  }
};

module.exports = { uploadImage, fetchImagesController };
