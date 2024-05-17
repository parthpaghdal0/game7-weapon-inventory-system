import { Document } from "mongoose";
import { IInventory } from "./inventory.interface";

export interface IUser extends Document {
  name: string;
  inventory: Array<IInventory>;
}
