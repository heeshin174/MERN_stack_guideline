import express from "express";
import mongoose from "mongoose";
import itemRoutes from "./routes/api/items.js";
import config from "./config/index.js";

const app = express();
const { MONGO_URI } = config;

// Used to parse JSON bodies
app.use(express.json());

// Connect to Mongo
// mongoose.connect returns Promise object
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err.massage));

// Use Routes
app.use("/api/items", itemRoutes);

export default app;
