import mongoose from "mongoose";

const swimmerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    team: { type: String, required: true },
    bio: String,
  },
  { collection: "swimmers", timestamps: false }
);

export const Swimmer = mongoose.model('Swimmer', swimmerSchema);