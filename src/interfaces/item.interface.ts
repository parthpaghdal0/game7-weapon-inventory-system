import { Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  perks?: Array<string>;
}
