import Carousel from "../models/carouselModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// GET all Carousels
const getAllCarousels = asyncHandler(async (req, res) => {
  try {
    const carousel = await Carousel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Carousels Retrieved Successfully",
      status: 200,
      data: carousel,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve Carousels",
      status: 500,
      data: null,
    });
  }
});

// GET a single Carousel
const getCarouselById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Not A Valid ID",
        status: 404,
        data: null,
      });
    }
    const singleCarousel = await Carousel.findById(id);

    if (!singleCarousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel Not Found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Carousel Retrieved Successfully",
      status: 200,
      data: singleCarousel,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve The Requested Carousel",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Carousel
  const createCarousel = asyncHandler(async (req, res) => {
    try {
      console.log("hello from carousel create controller")
      const media_file = req.file ? req.file.path : undefined;

      console.log('Request body:', req.body);
      console.log('Uploaded file Create controller:', req.file);
      // console.log('Uploaded file:', JSON.stringify(req.file, null,  2));

      const { carousel_title, carousel_subtitle } = req.body;
      if (!carousel_title || !carousel_subtitle || !media_file) {
        res.status(404).json({
          success: false,
          message: "Please Add All Fields",
          status: 404,
          data: null,
        });
      }

      // Check if a Carousel With The Same Title Already Exists
      const existingTitle = await Carousel.findOne({ carousel_title });
      if (existingTitle) {
        return res.status(409).json({
          success: false,
          message: "Carousel With The Same Title Already Exists",
          status: 409,
          data: null,
        });
      } else {
        const newCarousel = await Carousel.create({
          ...req.body,
          media_file: media_file,
        });
        res.status(201).json({
          success: true,
          message: "Carousel Created Successfully",
          status: 201,
          data: newCarousel,
        });
      }
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({
        success: false,
        message: error || "Failed To Create Carousel",
        status: 500,
        data: null,
      });
    }
  });

// UPDATE a Carousel
const updateCarousel = asyncHandler(async (req, res) => {
  // if u need to update a field without updating the carousel_image we check if req.file is available so we updated else we update the needed field(req.body)
  let carousel_image;
  if (req.file) {
    carousel_image = req.file.path;
  }
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Not A Valid ID",
        status: 404,
        data: null,
      });
    }
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel Not Found",
        status: 404,
        data: null,
      });
    } else {
      const updatedCarousel = await Carousel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, carousel_image: carousel_image },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Carousel Updated Successfully",
        status: 200,
        data: updatedCarousel,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Update The Requested Carousel",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Carousel
const deleteCarousel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        status: 404,
        data: null,
      });
    }

    const carousel = await Carousel.findByIdAndDelete(id);
    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel Not Found",
        status: 404,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Carousel Deleted Successfully",
        status: 200,
        data: carousel,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Delete The Requested Carousel",
      status: 500,
      data: null,
    });
  }
});

// DELETE all carousel
const deleteAllCarousels = asyncHandler(async (req, res) => {
  try {
    const carousel = await Carousel.deleteMany({});
    res.status(200).json({ message: "Delete All Carousels" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

export {
  createCarousel,
  getAllCarousels,
  getCarouselById,
  updateCarousel,
  deleteCarousel,
  deleteAllCarousels,
};
