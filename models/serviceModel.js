import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    service_title: {
      type: String,
      required: true,
    },
    priceSmall: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, // Enforce non-negative prices
        message: "Price must be non-negative",
      },
    },
    priceMedium: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, // Enforce non-negative prices
        message: "Price must be non-negative",
      },
    },
    priceLarge: {
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
    service_video: {
      type: String,
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
      miniTitle: {
        type: String,
      },
      first: {
        type: String,
      },
      second: {
        type: String,
      },
      third: {
        type: String,
      },
      fourth: {
        type: String,
      },
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
    serviceDetails: {
      leftImage: {
        type: String,
      },
      rightText: {
        type: String,
      },
      rightTitle: {
        type: String,
      },
      rightSubtitle: {
        type: String,
      },
      leftTitle: {
        type: String,
      },
      leftSubtitle1: {
        type: String,
      },
      leftSubtitle2: {
        type: String,
      },
      leftSubtitle3: {
        type: String,
      },
      leftText1: {
        type: String,
      },
      leftText2: {
        type: String,
      },
      leftText3: {
        type: String,
      },
      beforeImage: {
        type: String,
      },
      afterImage: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
// Middleware to add $ sign before saving
serviceSchema.pre("save", function (next) {
  // Ensure that the prices exist and are numbers before adding $
  if (typeof this.priceSmall === "number") {
    this.priceSmall = `$${this.priceSmall.toFixed(2)}`;
  }

  if (typeof this.priceMedium === "number") {
    this.priceMedium = `$${this.priceMedium.toFixed(2)}`;
  }

  if (typeof this.priceLarge === "number") {
    this.priceLarge = `$${this.priceLarge.toFixed(2)}`;
  }

  next();
});

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
