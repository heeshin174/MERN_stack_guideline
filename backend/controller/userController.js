import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

/**
 * @route POST api/users
 * @desc Register new user
 * @access Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name: name,
      email: email,
      password: hasedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @route POST api/users/login
 * @desc Authenticate a user
 * @access Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @route GET api/users/me
 * @desc Get user data
 * @access Private
 */
export const getMe = async (req, res, next) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name: name, email: email });
  } catch (err) {
    next(err);
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
