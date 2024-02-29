import mongoose from "mongoose";


const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);
