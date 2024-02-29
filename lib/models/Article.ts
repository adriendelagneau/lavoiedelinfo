import mongoose, { Schema } from "mongoose";
import { number } from "zod";

const imageSchema = new Schema({
  url: { type: String, required: true },
  legend: { type: String, required: true },
});

const articleSchema = new Schema({
  title: { type: String, required: true },
  slug: {type: String, required: true},
  content: [{ type: String, required: true }],
  category: {
    id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    slug: { type: String, required: true },
  },
  subcategory: {
    id: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    slug: { type: String },
  },
  author: { type: Schema.Types.ObjectId, ref: "Author" },
  images: [imageSchema],
  numberOfViews: { type: number, default: 0}
}, { timestamps: true });

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);


  

