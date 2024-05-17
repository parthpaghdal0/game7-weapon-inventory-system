import { Document } from "mongoose";

export interface IPerk extends Document {
  name: string;
  type: string;
  value: number;
}
