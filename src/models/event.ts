import mongoose from "mongoose";
import {Swimmer} from './swimmer';

const eventSchema = new mongoose.Schema(
  {
    meetId: { type: Number, required: true },
    raceId: { type: Number, required: true },
    heatNum: { type: Number, required: true, unique: true },
    swimmerIds: [Number]
  },
  { collection: "events", timestamps: false }
);

export const Event = mongoose.model('Event', eventSchema);
//export function getSwimmersForEvent (event : Event) {}