const Class = require("../models/Class");
const {createClassSchema } = require("../schemas/class.schema");

const createClass = async(req, res) => {
    try {
        const data = createClassSchema.parse(req.body);

        const newClass = await Class.create({
            className: data.className,
            teacherId: req.user.id,
            studentIds: []
        });

        return res.status(201).json({
            success: true,
            message:
        })
    }
}