const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../schemas/auth.schema");

const signup = async (req, res) => {
  try {
    //  validate input
    const parsed = signupSchema.parse(req.body);

    const { name, email, password, role } = parsed;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        error: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,            // FIXED
      email,
      password: hashed,
      role
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    console.error(err);

    // optional: better zod error
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: err.errors
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

const me = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

module.exports = { signup, login, me };
