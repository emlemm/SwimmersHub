import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coachRole: { type: Boolean, required: true }
  },
  { collection: "users", timestamps: false }
);

export const User = mongoose.model('User', userSchema);

export type UserWithoutPassword = Pick<InstanceType<typeof User>, "firstName" | "lastName" | "email" | "coachRole">;