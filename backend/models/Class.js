const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    classId: {
        type: String,
        unique: true,
        required: true
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

module.exports = mongoose.model("Class", ClassSchema, "classes");