import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if the database is already connected (readyState 1 means connected)
    if (mongoose.connection.readyState === 1) {
      console.log("Database is already connected.");
      return;
    }

    // Listen for connection events only once to avoid potential memory leaks
    mongoose.connection.once("connected", () => {
      console.log("Database connected successfully.");
    });

    mongoose.connection.once("error", (err) => {
      console.error("Database connection error:", err);
    });

    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

export { connectDB };