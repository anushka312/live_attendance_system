const { z } = require("zod");

const createClassSchema = z.object({
    className: z.object().min(2, "Class name must be 2 characters atleast.")
});

module.exports = {createClassSchema}