import { HttpError } from "../errors/http.error";
import { IItem } from "../interfaces/item.interface";
import Item from "../models/item.model";

export class ItemService {

  public findAll(): Promise<IItem[]> {
    return Item.find({}).exec();
  }

  public add(obj: any): Promise<IItem> {
    const newObj = new Item(obj);
    return newObj.save();
  }

  public find(id: string): Promise<IItem[]> {
    return Item.findById(id).exec();
  }

  public async delete(id: string) {
    const deletedObj: IItem = await Item.findByIdAndDelete(
      id
    );

    if (!deletedObj) {
      throw new HttpError(`Item with id '${id}' not found`, 404);
    }

    return deletedObj;
  }

  public async update(id: string, obj: IItem | Partial<IItem>) {
    const updatedObj: IItem = await Item.findByIdAndUpdate(
      id,
      obj
    );

    if (!updatedObj) {
      throw new HttpError(`Item with id '${id}' not found`, 404);
    }

    return updatedObj;
  }
}
