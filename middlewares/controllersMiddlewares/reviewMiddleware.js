import { validationResult, check } from "express-validator";

// Validation middleware using express-validator
export const validateReview = [
  check("rating").isInt().withMessage("Rating must be an integer"),
  check("comment").isString().withMessage("Comment must be a string"),
  check("service_title")
    .isString()
    .withMessage("Service title must be a string"),
  (req, res, next) => {
    // Check if required fields are present
    const { rating, comment, service_title } = req.body;
    if (!rating || !comment || !service_title) {
      return res.status(400).json({
        success: false,
        message: "Please Add All Fields",
        status: 400,
        data: null,
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        status: 400,
        data: errors.array(),
      });
    }

    next();
  },
];
