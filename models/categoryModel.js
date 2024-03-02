import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_title: {
    type: String,
    required: true,
  },
  category_description: {
    type: String,
    required: true,
  },
  category_image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
