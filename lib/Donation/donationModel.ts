import mongoose, { Schema, models } from "mongoose";
import { connectDB } from "../database";
import { donationType } from "./donationType";

connectDB().catch(err => {
  console.error("Failed to connect to the database:", err);
});

const donationSchema = new Schema<donationType>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const Donation = models.Donation || mongoose.model<donationType>("Donation", donationSchema);

export default Donation