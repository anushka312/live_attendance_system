const { z } = require("zod");

const registerUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["student", "teacher"])
});

module.exports = { registerUserSchema };