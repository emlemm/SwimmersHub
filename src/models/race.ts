import mongoose from "mongoose";

const raceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ageGroup: { type: String, required: true },
  },
  { collection: "races", timestamps: false }
);

export const Race = mongoose.model('Race', raceSchema);