import mongoose from "mongoose";

const raceResultsSchema = new mongoose.Schema(
  {
    eventId: { type: Number, required: true },
    swimmerId: { type: Number, required: true }, 
    disqualified: Boolean,
    time: Number
  },
  { collection: "raceResults", timestamps: false }
);

export const RaceResults = mongoose.model("RaceResults", raceResultsSchema);
