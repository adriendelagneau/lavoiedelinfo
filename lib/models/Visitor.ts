import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({

    ip: {
        type: String,
        required: true
    },
    countOfViews: {
        type: Number,
        required: true,
    },
    // lastIncremented: {
    //     type: Date
    // }
    

}, { timestamps: true })

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);

