const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const { registerUserSchema } = require("../schemas/user.schema");

const registerUser = async (req, res) => {
  try {
    const data = registerUserSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userId = `USR-${uuidv4()}`;
    const user = await User.create({
      ...data,
      userId,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    if (err.code === 11000 && err.keyValue?.email) {
        return res.status(400).json({
            success: false,
            error: "Email already exists"
        });
    }

    if (err.name === "ZodError") {
      return res.status(400).json(err.errors);
    }

    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised, invalid password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};


module.exports = { registerUser };
