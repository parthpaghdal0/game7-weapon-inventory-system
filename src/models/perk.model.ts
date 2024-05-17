import { Schema, model } from "mongoose";

import { IPerk } from "../interfaces/perk.interface";

export const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Field is required"] },
    type: { type: String, required: [true, "Field is required"] },
    value: { type: Number, required: [true, "Field is required"] },
  },
  { versionKey: false }
);

export default model<IPerk>("Perk", UserSchema);
