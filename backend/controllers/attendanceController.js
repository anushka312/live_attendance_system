const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const { activeSessions } = require("../services/wsServer");

const startAttendance = async (req, res) => {
  try {
    const { classId } = req.body;

    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ success: false, error: "Class not found" });
    }

    if (classDoc.teacherId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    // Initialize session in-memory
    activeSessions[classId] = { attendance: {} };

    res.status(200).json({
      success: true,
      data: {
        classId,
        startedAt: new Date()
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const myAttendance = async (req, res) => {
  try {
    const record = await Attendance.findOne({
      classId: req.params.id,
      studentId: req.user.id
    });

    res.status(200).json({
      success: true,
      data: {
        classId: req.params.id,
        status: record ? record.status : "not yet updated"
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { startAttendance, myAttendance };
