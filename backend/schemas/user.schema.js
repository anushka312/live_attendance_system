const { z } = require("zod");

const registerUserSchema = z.object({
    userId: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["student", "teacher"])
});

module.exports = { registerUserSchema };