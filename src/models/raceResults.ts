import mongoose from "mongoose";

const raceResultsSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Types.ObjectId, required: true, ref: "Event" },
    swimmerId: { type: mongoose.Types.ObjectId, required: true, ref: "Swimmer" }, 
    disqualified: Boolean,
    time: Number
  },
  { collection: "raceResults", timestamps: false }
);

export const RaceResults = mongoose.model("RaceResults", raceResultsSchema);
