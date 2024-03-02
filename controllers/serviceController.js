import Category from "../models/categoryModel.js";
import Service from "../models/serviceModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";

// GET all Services
const getAllServices = asyncHandler(async (req, res) => {
  try {
    const service = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Services Retrieved Successfully",
      status: 200,
      data: service,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve Services",
      status: 500,
      data: null,
    });
  }
});

// GET a single Service
const getServiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        status: 400,
        data: null,
      });
    }
    const singleService = await Service.findById(id);

    if (!singleService) {
      return res.status(400).json({
        success: false,
        message: "Service Not Found",
        status: 400,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Retrieved Successfully",
      status: 200,
      data: singleService,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve The Requested Service",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Service
const createService = asyncHandler(async (req, res) => {
  try {
    // const service_image = req.file ? req.file.path : "";
    const service_image = req.files.service_image
      ? req.files.service_image[0].path
      : "";
    const service_video = req.files.service_video
      ? req.files.service_video[0].path
      : "";
    const leftImage = req.files["serviceDetails[leftImage]"]
      ? req.files["serviceDetails[leftImage]"][0].path
      : "";
    const beforeImage = req.files["serviceDetails[beforeImage]"]
      ? req.files["serviceDetails[beforeImage]"][0].path
      : "";
    const afterImage = req.files["serviceDetails[afterImage]"]
      ? req.files["serviceDetails[afterImage]"][0].path
      : "";
    const {
      service_title,
      serviceDetails,
      service_description,
      category_title,
      featured,
      quantity,
    } = req.body;
    if (
      !service_title ||
      
      !service_description ||
      !service_image ||
      !category_title ||
      !quantity
    ) {
      return res.status(404).json({
        success: false,
        message: "Please Add All Fields",
        status: 404,
        data: null,
      });
    }
    // Check if a Service With The Same Title Already Exists
    const existingTitle = await Service.findOne({ service_title });
    if (existingTitle) {
      return res.status(409).json({
        success: false,
        message: "Service With The Same Title Already Exists",
        status: 409,
        data: null,
      });
    }
    const category = await Category.findOne({
      category_title: category_title,
    });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Cannot Find Category",
        status: 400,
        data: null,
      });
    }
    const newService = await Service.create({
      ...req.body,
      service_image: service_image,
      service_video: service_video,
      serviceDetails: {
        ...req.body.serviceDetails,
        leftImage: leftImage,
        beforeImage: beforeImage,
        afterImage: afterImage,
      },
      categoryId: category._id,
    });
    return res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      status: 200,
      data: newService,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed To Create Service",
      status: 500,
      data: null,
    });
  }
});

// UPDATE a Service
const updateService = asyncHandler(async (req, res) => {
  // if u need to update a field without updating the image we check if req.file is available so we updated else we update the needed field(req.body)
  let service_image;
  let service_video;
  let leftImage;
  let beforeImage;
  let afterImage;

  if (req.files) {
    service_image = req.files.service_image
      ? req.files.service_image[0].path
      : "";
    service_video = req.files.service_video
      ? req.files.service_video[0].path
      : "";
    leftImage = req.files["serviceDetails[leftImage]"]
      ? req.files["serviceDetails[leftImage]"][0].path
      : "";
    beforeImage = req.files["serviceDetails[beforeImage]"]
      ? req.files["serviceDetails[beforeImage]"][0].path
      : "";
    afterImage = req.files["serviceDetails[afterImage]"]
      ? req.files["serviceDetails[afterImage]"][0].path
      : "";
  }

  try {
    const { id } = req.params;
    const { category_title, service_title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        status: 400,
        data: null,
      });
    }
    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Service Not Found",
        status: 400,
        data: null,
      });
    }
    const category = await Category.findOne({
      category_title: category_title,
    });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Cannot Find Category",
        status: 400,
        data: null,
      });
    }

    const existedTitle = await Service.findOne({ service_title });
    if (existedTitle) {
      return res.status(409).json({
        success: false,
        message: "Service With The Same Title Already Exists",
        status: 409,
        data: null,
      });
    } else {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        {
          ...req.body,
          categoryId: category._id,
          service_image: service_image || service.service_image,
          service_video: service_video || service.service_video,
          serviceDetails: {
            ...req.body.serviceDetails,
            leftImage: leftImage || service.serviceDetails.leftImage,
            beforeImage: beforeImage || service.serviceDetails.beforeImage,
            afterImage: afterImage || service.serviceDetails.afterImage,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Service Updated Successfully",
        status: 200,
        data: updatedService,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Update The Requested Service",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Service
const deleteService = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        data: null,
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Service Not Found",
        status: 400,
        data: null,
      });
    }
    // Delete the service
    await service.deleteOne();
    // Delete related reviews
    await Review.deleteMany({ serviceId: id });

    res.status(200).json({
      success: true,
      message: "Service and related reviews deleted successfully",
      status: 200,
      data: service,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Delete The Requested Service",
      status: 500,
      data: null,
    });
  }
});

// DELETE all Services
const deleteAllServices = asyncHandler(async (req, res) => {
  try {
    const service = await Service.deleteMany({});
    res.status(200).json({ message: "Delete All Services" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  deleteAllServices,
};
