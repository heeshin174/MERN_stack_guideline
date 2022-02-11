import Goal from "../models/goal.js";
import User from "../models/userModel.js";

/**
 * @route GET api/goals
 * @desc Get All Goals
 * @access Public
 */
export const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST api/goals
 * @desc    Create an Goal
 * @access  Private
 */
export const setGoal = async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(404);
      throw new Error("Please add a text field");
    }
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
};

/**
 * @route   UPDATE api/goals/:id
 * @desc    UPDATE an Goal
 * @access  Private
 */
export const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateGoal);
  } catch (err) {
    next(err);
  }
};

/**
 * @route   DELETE api/goals/:id
 * @desc    DELETE an Goal
 * @access  Private
 */
export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await goal.remove();

    res
      .status(200)
      .json({ id: req.params.id, message: `Delete goal ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};
