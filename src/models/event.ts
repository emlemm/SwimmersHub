import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventNumber: { type: Number, required: true },
    meetId: { type: mongoose.Types.ObjectId, required: true, ref: "Meet" },
    raceId: { type: mongoose.Types.ObjectId, required: true, ref: "Race" },
    swimmerNames: [String]
  },
  { collection: "events", timestamps: false }
);

export const Event = mongoose.model('Event', eventSchema);