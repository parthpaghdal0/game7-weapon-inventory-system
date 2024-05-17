import { Schema, model } from "mongoose";

import { IItem } from "../interfaces/item.interface";

export const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Field is required"] },
    perks: { type: Array, required: false },
  },
  { versionKey: false }
);

export default model<IItem>("Item", UserSchema);
