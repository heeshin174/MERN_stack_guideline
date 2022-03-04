import mongoose from "mongoose";

// Create a goal Schema
const goalSchema = mongoose.Schema(
  {
    // get user id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
