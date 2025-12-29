const jwt = require("jsonwebtoken");

const isTeacher = (req, res, next) => {
    if( req.user.role !== "teacher"){
        return res.status(403).json({
            success: false,
            error: "Forbidden, teacher access required"
        });
    }
    next();
};

module.exports = isTeacher;