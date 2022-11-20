import mongoose from "mongoose";
import { ListDTO } from "../dto/List.dto";

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ListDTO & mongoose.Document>("List", listSchema);
