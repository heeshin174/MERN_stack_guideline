import express from "express";
import Item from "../../models/itemModel.js";

const router = express.Router();

/**
 * @route GET api/items
 * @desc Get All Items
 * @access Public
 */

// Since we are already in the "/api/items" from server.js, we just need a '/'
// '/' represents the actual endpoint since we're using the router.
// If you define it in the server.js, we need to write app.get("./api/items");
// Write a callback function that takes request and response
// find() method returns a Promise object
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    if (!items) throw Error("No items");

    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post("/", async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  try {
    const item = await newItem.save();
    if (!item) throw Error("Something went wrong saving the item");

    res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete An Item
 * @access  Private
 */

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error("No item found");

    const removed = await item.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the item");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;
