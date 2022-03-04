import mongoose from "mongoose";

// Connect to Mongo
// mongoose.connect returns Promise object
// version1. using async/awiat
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // .cyan.underline is from `colors` package
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.message);
    process.exit(1); // quit program
  }
};

// version2. using Promise
// const connectDB = mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err.massage));
