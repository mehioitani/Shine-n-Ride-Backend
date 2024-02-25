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
  media_file:{
  type: String,
  required: true,
  
}
});

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
