import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/user.interface";

export const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Field is required"] },
    inventory: { type: Array, required: false },
  },
  { versionKey: false }
);

export default model<IUser>("User", UserSchema);
