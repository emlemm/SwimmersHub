import mongoose from "mongoose";

const heatingSchema = new mongoose.Schema(
  {
    heatingNumber: { type: Number, required: true },
    meetId: { type: mongoose.Types.ObjectId, required: true, ref: "Meet" },
  },
  { collection: "heating", timestamps: false }
);

export const Heating = mongoose.model('Heating', heatingSchema);