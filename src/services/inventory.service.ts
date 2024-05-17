import { HttpError } from "../errors/http.error";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

export class InventoryService {

  public async discard(userId: string, itemId: string) {
    const updatedObj: IUser = await User.findByIdAndUpdate(userId, {
      $pull: { inventory: { itemId: itemId } }
    }, { new: true });

    if (!updatedObj) {
      throw new HttpError(`User with id '${userId}' not found`, 404);
    }

    return updatedObj;
  }

  public async equip(userId: string, itemId: string) {
    const updatedObj: IUser = await User.findOneAndUpdate({
      _id: userId, 'inventory.itemId': itemId
    }, {
      $set: { 'inventory.$.equipped': true }
    }, { new: true });

    if (!updatedObj) {
      throw new HttpError(`User with id '${userId}' not found`, 404);
    }

    return updatedObj;
  }

  public async transfer(senderId: string, receiverId: string, itemId: string, quantity: number) {
    const sender: IUser = await User.findById(senderId);

    if (!sender) {
      throw new HttpError(`User with id '${senderId}' not found`, 404);
    }

    const itemIndex = sender.inventory.findIndex(item => item.itemId == itemId);

    if (itemIndex == -1) {
      throw new HttpError(`Item with id '${itemId}' not found in the sender's inventory`, 404);
    }

    const receiver: IUser = await User.findById(receiverId);

    if (!receiver) {
      throw new HttpError(`User with id '${receiverId}' not found`, 404);
    }

    const q = (quantity >= sender.inventory[itemIndex].quantity) ? sender.inventory[itemIndex].quantity : quantity;
    sender.inventory[itemIndex].quantity -= q;
    if (sender.inventory[itemIndex].quantity == 0) {
      sender.inventory.splice(itemIndex, 1);
    }
    await User.findByIdAndUpdate(senderId, {
      inventory: sender.inventory
    })

    const newItemIndex = receiver.inventory.findIndex(item => item.itemId == itemId);

    if (newItemIndex >= 0) {
      receiver.inventory[newItemIndex].quantity += q;
    }
    else {
      receiver.inventory.push({
        itemId,
        quantity: q,
        equipped: false
      })
    }
    await User.findByIdAndUpdate(receiverId, {
      inventory: receiver.inventory
    })

    return receiver;
  }
}
