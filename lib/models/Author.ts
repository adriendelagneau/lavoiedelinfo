import mongoose, { Schema } from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, 
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

export default mongoose.models.Author || mongoose.model("Author", authorSchema);