const { is } = require("zod/v4/locales");

const isStudent = (req, res, next) => {
    if( req.user.role !== "student"){
        return res.status(403).json({
            success: false,
            error: "forbidden, student access required"
        });
    }
    next();
}

module.exports = isStudent;