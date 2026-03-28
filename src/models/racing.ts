import mongoose from "mongoose";

const racingSchema = new mongoose.Schema(
  {
    racingNumber: { type: Number, required: true },
    meetId: { type: mongoose.Types.ObjectId, required: true, ref: "Meet" },
  },
  { collection: "racing", timestamps: false }
);

export const Racing = mongoose.model('Racing', racingSchema);