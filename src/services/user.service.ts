import { HttpError } from "../errors/http.error";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

export class UserService {

  public findAll(): Promise<IUser[]> {
    return User.find({}).exec();
  }

  public add(obj: any): Promise<IUser> {
    const newObj = new User(obj);
    return newObj.save();
  }

  public find(id: string): Promise<IUser[]> {
    return User.findById(id).exec();
  }

  public async delete(id: string) {
    const deletedObj: IUser = await User.findByIdAndDelete(
      id
    );

    if (!deletedObj) {
      throw new HttpError(`User with id '${id}' not found`, 404);
    }

    return deletedObj;
  }

  public async update(id: string, obj: IUser | Partial<IUser>) {
    const updatedObj: IUser = await User.findByIdAndUpdate(
      id,
      obj
    );

    if (!updatedObj) {
      throw new HttpError(`User with id '${id}' not found`, 404);
    }

    return updatedObj;
  }
}
