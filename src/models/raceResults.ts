import mongoose from "mongoose";

const raceResultsSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Types.ObjectId, required: true, ref: "Event" },
    swimmerName: { type: String, required: true}, 
    disqualified: Boolean,
    time: String
  },
  { collection: "raceResults", timestamps: false }
);

export const RaceResults = mongoose.model("RaceResults", raceResultsSchema);
