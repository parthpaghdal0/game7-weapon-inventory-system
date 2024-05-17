import { HttpError } from "../errors/http.error";
import { IPerk } from "../interfaces/perk.interface";
import Perk from "../models/perk.model";

export class PerkService {

  public findAll(): Promise<IPerk[]> {
    return Perk.find({}).exec();
  }

  public add(obj: any): Promise<IPerk> {
    const newObj = new Perk(obj);
    return newObj.save();
  }

  public find(id: string): Promise<IPerk[]> {
    return Perk.findById(id).exec();
  }

  public async delete(id: string) {
    const deletedObj: IPerk = await Perk.findByIdAndDelete(
      id
    );

    if (!deletedObj) {
      throw new HttpError(`Perk with id '${id}' not found`, 404);
    }

    return deletedObj;
  }

  public async update(id: string, obj: IPerk | Partial<IPerk>) {
    const updatedObj: IPerk = await Perk.findByIdAndUpdate(
      id,
      obj
    );

    if (!updatedObj) {
      throw new HttpError(`Perk with id '${id}' not found`, 404);
    }

    return updatedObj;
  }
}
