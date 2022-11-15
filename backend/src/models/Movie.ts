import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    imageTitle: {
      type: String,
    },
    imageSm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("movie", movieSchema);
