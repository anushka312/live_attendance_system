import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    attendanceId: {
        type: String,
        unique: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: "present" | "absent"
})

export default mongoose.model("Attendance", AttendanceSchema, "attendance");