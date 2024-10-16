import mongoose, { Schema, models } from "mongoose";
import { connectDB } from "../database";
import userType from "./userType";


// Ensure database is connected before defining the model
connectDB().catch(err => {
  console.error("Failed to connect to the database:", err);
});

const userSchema = new Schema<userType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists before creating it
const User = models.User || mongoose.model<userType>("User", userSchema);

export default User;