import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    service_title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, // Enforce non-negative prices
        message: "Price must be non-negative",
      },
    },
    service_image: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
      validate: {
        validator: (value) => typeof value === "boolean", // Check if it's a boolean
        message: "Featured must be a boolean",
      },
    },
    service_description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
serviceSchema.pre("find", function (next) {
  this.populate(["categoryId"]);
  next();
});

serviceSchema.pre("findOne", function (next) {
  this.populate(["categoryId"]);
  next();
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
