import mongoose from "mongoose";

// Create a goal Schema
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true, // add updataed day and create day field
  }
);

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
