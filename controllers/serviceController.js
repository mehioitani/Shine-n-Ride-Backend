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
      categoryId: category._id,
    });
    return res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      status: 200,
      data: newService,
    });
  } catch (error) {
    console.log(error);
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
  if (req.file) {
    service_image = req.file.path;
  }

  try {
    const { id } = req.params;
    const { category_title } = req.body;
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
          service_image: service_image,
        },
        { new: true }
      );
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service Not Found for Update",
          status: 404,
          data: null,
        });
      }
      res.status(200).json({
        success: true,
        message: "Service Updated Successfully",
        status: 200,
        data: updatedService,
      });
    }
  } catch (error) {
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
    console.error(error);
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
