const express = require("express");
const router = express.Router();
const {getStudents} = require("../controllers/userController");
const auth = require("../middleware/auth");
const isTeacher = require("../middleware/isTeacher");

router.get("/students", auth, isTeacher, getStudents);

//router.post("/create", auth, isTeacher, createClass);
module.exports = router;