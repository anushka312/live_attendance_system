const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isTeacher = require("../middleware/isTeacher");

const {
    createClass, addStudent, getClass
} = require("../controllers/classController");

router.post("/", auth, isTeacher, createClass);
router.post("/:id/add-student", auth, isTeacher, addStudent);
router.get("/:id", auth, getClass);

module.exports = router;