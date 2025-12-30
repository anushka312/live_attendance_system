const {z} = require("zod");

const markAttendanceSchema = z.object({
    classId: z.string().min(1)
});

module.exports = {markAttendanceSchema};