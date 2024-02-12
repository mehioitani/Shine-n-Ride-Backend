import { validationResult, check } from "express-validator";

// Validation middleware using express-validator
export const validateReview = [
  check("price").isInt().withMessage("Price must be an integer"),
  check("service_title")
    .isString()
    .withMessage("Service Title must be a string"),
  check("service_description")
    .isString()
    .withMessage("Service Description must be a string"),
  check("category_title")
    .isString()
    .withMessage("Category Title must be a string"),
  check("service_image")
    .isString()
    .withMessage("Service Image must be a string"),
  check("featured").isBoolean.withMessage("Featured must be a boolean"),

  (req, res, next) => {
    // Check if required fields are present
    const { service_image } = req.file?.path;
    const {
      price,
      service_title,
      service_description,
      category_title,
      featured,
    } = req.body;
    if (
      !price ||
      !service_title ||
      !service_description ||
      !category_title ||
      !service_image
    ) {
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
