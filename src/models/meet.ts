import mongoose from "mongoose";

const meetSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    hostTeam: { type: String, required: true },
    address: { type: String, required: true }, 
    travellingTeam: { type: String, required: true }
  },
  { collection: "meets", timestamps: false }
);

export const Meet = mongoose.model('Meet', meetSchema);