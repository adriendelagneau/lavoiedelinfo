import mongoose, { Schema } from "mongoose";




const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sub: [{  type: Schema.Types.ObjectId, ref: "Subcategory"  }],
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);



