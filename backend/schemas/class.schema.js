const { z } = require("zod");

const createClassSchema = z.object({
    className: z.string().min(2, "Class name must be 2 characters at least")
});

module.exports = {createClassSchema};