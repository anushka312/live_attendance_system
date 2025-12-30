const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ["present", "absent"],
        required: true
    }
}
);

AttendanceSchema.index(
    {classId: 1, studentId: 1},
    {unique: true}
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;