const Class = require("../models/Class");
const User = require("../models/User");
const { createClassSchema } = require("../schemas/class.schema");

const createClass = async (req, res) => {
  try {
    const data = createClassSchema.parse(req.body);

    const newClass = await Class.create({
      classId: `CLS-${Date.now()}`,
      className: data.className,
      teacherId: req.user.id,
      studentIds: []
    });

    res.status(201).json({
      success: true,
      data: newClass
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

const addStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    const classDoc = await Class.findById(req.params.id);
    if (!classDoc) {
      return res.status(404).json({
        success: false,
        error: "Class not found"
      });
    }

    if (classDoc.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Forbidden"
      });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(400).json({
        success: false,
        error: "Invalid student"
      });
    }

    classDoc.studentIds.addToSet(student._id);
    await classDoc.save();

    res.status(200).json({
      success: true,
      data: classDoc
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

const getClass = async (req, res) => {
  const classDoc = await Class
    .findById(req.params.id)
    .populate("studentIds", "name email");

  if (!classDoc) {
    return res.status(404).json({
      success: false,
      error: "Class not found"
    });
  }

  const isTeacher = classDoc.teacherId.toString() === req.user.id;
  const isStudent = classDoc.studentIds.some(
    s => s._id.toString() === req.user.id
  );

  if (!isTeacher && !isStudent) {
    return res.status(403).json({
      success: false,
      error: "Forbidden"
    });
  }

  res.status(200).json({
    success: true,
    data: classDoc
  });
};

module.exports = { createClass, addStudent, getClass };
