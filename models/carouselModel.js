import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  carousel_title: {
    type: String,
    required: false,
    unique: true,
  },
  carousel_subtitle: {
    type: String,
    required: false,
  },
  carousel_image:{
  type: String,
  required: true,
  
}
});

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
