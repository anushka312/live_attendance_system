const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");
const { startAttendance, myAttendance } = require("../controllers/attendanceController");


router.post("/start", auth, isTeacher, startAttendance);
router.get("/class/:id/my-attendance", auth, isStudent, myAttendance);

module.exports = router;