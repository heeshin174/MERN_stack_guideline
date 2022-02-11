import express from "express";
import itemRoutes from "./routes/api/itemRouters.js";
import goalRoutes from "./routes/api/goalRouters.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use("/api/items", itemRoutes);
app.use("/api/goals", goalRoutes);

// Error Middleware: override default express js error handler
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

export default app;
