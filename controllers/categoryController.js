import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// GET all Categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Categories Retrieved Successfully",
      status: 200,
      data: category,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve Categories",
      status: 500,
      data: null,
    });
  }
});

// GET a single Category
const getCategoryById = asyncHandler(async (req, res) => {
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
    const singleCategory = await Category.findById(id);

    if (!singleCategory) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Retrieved Successfully",
      status: 200,
      data: singleCategory,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve The Requested Category",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const category_image = req.file?.path;

    const { category_title, category_description } = req.body;
    if (!category_title || !category_description || !category_image) {
      res.status(404).json({
        success: false,
        message: "Please Add All Fields",
        status: 404,
        data: null,
      });
    }
    // Check if a Category With The Same Title Already Exists
    const existingTitle = await Category.findOne({ category_title });
    if (existingTitle) {
      return res.status(409).json({
        success: false,
        message: "Category With The Same Title Already Exists",
        status: 409,
        data: null,
      });
    } else {
      const newCategory = await Category.create({
        ...req.body,
        category_image: category_image,
      });
      res.status(201).json({
        success: true,
        message: "Category Created Successfully",
        status: 200,
        data: newCategory,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed To Create Category",
      status: 500,
      data: null,
    });
  }
});

// UPDATE a Category
const updateCategory = asyncHandler(async (req, res) => {
  // if u need to update a field without updating the image we check if req.file is available so we updated else we update the needed field(req.body)
  let category_image;
  if (req.file) {
    category_image = req.file.path;
  }
  const { id } = req.params;
  const { category_title } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Not A Valid ID",
        status: 404,
        data: null,
      });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
        status: 404,
        data: null,
      });
    }
    const existedTitle = await Category.findOne({ category_title });
    if (existedTitle) {
      return res.status(409).json({
        success: false,
        message: "Category With The Same Title Already Exists",
        status: 409,
        data: null,
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { ...req.body, category_image: category_image },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Category Updated Successfully",
        status: 200,
        data: updatedCategory,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Update The Requested Category",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        data: null,
      });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
        status: 404,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
        status: 200,
        data: category,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      message: "Failed To Delete The Requested Category",
      status: 500,
      data: null,
    });
  }
});

// DELETE all categories
const deleteAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Category.deleteMany({});
    res.status(200).json({ message: "Delete All Categories" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
