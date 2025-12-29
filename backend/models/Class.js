import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    classId: {
        type: String,
        unique: true
    },
    className: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    studentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model("Class", ClassSchema, "classes");