import Review from "../models/reviewModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// GET all Reviews
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const review = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Reviews Retrieved Successfully",
      status: 200,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve Reviews",
      status: 500,
      data: null,
    });
  }
});

// GET a single review
const getReviewById = asyncHandler(async (req, res) => {
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
    const singleReview = await Review.findById(id);

    if (!singleReview) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Review Retrieved Successfully",
      status: 200,
      data: singleReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Retrieve The Requested Review",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Review
const createReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      res.status(404).json({
        success: false,
        message: "Please Add All Fields",
        status: 404,
        data: null,
      });
    } else {
      const newReview = await Review.create(req.body);
      res.status(201).json({
        success: true,
        message: "Review Created Successfully",
        status: 200,
        data: newReview,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed To Create Review",
      status: 500,
      data: null,
    });
  }
});

// UPDATE a Review
const updateReview = asyncHandler(async (req, res) => {
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
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
        status: 404,
        data: null,
      });
    } else {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Review Updated Successfully",
        status: 200,
        data: updatedReview,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Update The Requested Review",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Review
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid ID",
        data: null,
      });
    }

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
        status: 404,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
        status: 200,
        data: review,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Delete The Requested Review",
      status: 500,
      data: null,
    });
  }
});

// DELETE all Reviews
const deleteAllReviews = asyncHandler(async (req, res) => {
  try {
    const review = await Review.deleteMany({});
    res.status(200).json({ message: "Delete All Reviews" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  deleteAllReviews,
};
