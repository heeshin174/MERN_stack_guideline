import dotenv from "dotenv";

// allow to use configurations in .env file with `process.env.{name}`
// dotenv.config({ silent: process.env.NODE_ENV === "production" });
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  // JWT_SECRET: process.env.JWT_SECRET,
};
