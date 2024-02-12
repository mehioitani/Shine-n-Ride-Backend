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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre("find", function (next) {
  this.populate(["serviceId"]);
  next();
});

reviewSchema.pre("findOne", function (next) {
  this.populate(["serviceId"]);
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
