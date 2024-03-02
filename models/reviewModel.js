import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre("find", function (next) {
  this.populate(["categoryId"]);
  next();
});

reviewSchema.pre("findOne", function (next) {
  this.populate(["categoryId"]);
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
