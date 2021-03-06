import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create a Item Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

// A model is a class with which we construct documents.
// In this case, each document will be a item with properties and behaviors as declared in our schema.
const Item = mongoose.model("Item", ItemSchema);

// export Item variable, so that other files can access Item variable.
export default Item;
