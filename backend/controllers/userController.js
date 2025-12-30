const User = require("../models/User");

const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("name email");

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
}
module.exports = { getStudents };