import { InventoryService } from './inventory.service';
import { HttpError } from '../errors/http.error';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

jest.mock('../models/user.model');

describe('InventoryService', () => {
  let inventoryService: InventoryService;

  beforeEach(() => {
    inventoryService = new InventoryService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('discard', () => {
    it('should discard an item from user inventory', async () => {
      const userId = '123';
      const itemId = '456';
      const updatedUser = { _id: userId, inventory: [{ itemId: itemId, equipped: false }] };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedUser);

      const result = await inventoryService.discard(userId, itemId);

      expect(result).toEqual(updatedUser);
    });

    it('should throw HttpError if user not found', async () => {
      const userId = '123';
      const itemId = '456';
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);
      
      await expect(inventoryService.discard(userId, itemId)).rejects.toThrow(
        new HttpError(`User with id '${userId}' not found`, 404)
      );
    });
  });

  describe('equip', () => {
    it('should equip an item in user inventory', async () => {
      const userId = '123';
      const itemId = '456';
      const updatedUser = { _id: userId, inventory: [{ itemId: itemId, equipped: true }] };
      (User.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(updatedUser);

      const result = await inventoryService.equip(userId, itemId);

      expect(result).toEqual(updatedUser);
    });

    it('should throw HttpError if user not found', async () => {
      const userId = '123';
      const itemId = '456';
      (User.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(null);
      
      await expect(inventoryService.equip(userId, itemId)).rejects.toThrow(
        new HttpError(`User with id '${userId}' not found`, 404)
      );
    });
  });

  describe('transfer', () => {
    it('should transfer an item from sender to receiver', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      const sender = { _id: senderId, inventory: [{ itemId: itemId, quantity: 2, equipped: false }] };
      const receiver = { _id: receiverId, inventory: [] };
      (User.findById as jest.Mock)
        .mockResolvedValueOnce(sender)
        .mockResolvedValueOnce(receiver);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(sender);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(receiver);

      const result = await inventoryService.transfer(senderId, receiverId, itemId, quantity);

      expect(result).toEqual(receiver);
    });

    it('should full transfer an item from sender to receiver', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      const sender = { _id: senderId, inventory: [{ itemId: itemId, quantity: 5, equipped: false }] };
      const receiver = { _id: receiverId, inventory: [] };
      (User.findById as jest.Mock)
        .mockResolvedValueOnce(sender)
        .mockResolvedValueOnce(receiver);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(sender);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(receiver);

      const result = await inventoryService.transfer(senderId, receiverId, itemId, quantity);

      expect(result).toEqual(receiver);
    });

    it('should transfer an item from sender to receiver and update quantity if item already exists in receiver inventory', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      const sender = { _id: senderId, inventory: [{ itemId: itemId, quantity: 5, equipped: false }] };
      const receiver = { _id: receiverId, inventory: [{ itemId: itemId, quantity: 3, equipped: false }] };
      (User.findById as jest.Mock)
        .mockResolvedValueOnce(sender)
        .mockResolvedValueOnce(receiver);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(sender);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(receiver);

      const result = await inventoryService.transfer(senderId, receiverId, itemId, quantity);

      expect(result).toEqual(receiver);
      // Quantity of the transferred item in receiver's inventory should be updated
      expect(result.inventory.find(item => item.itemId === itemId)?.quantity).toEqual(5);
    });

    it('should throw HttpError if sender not found', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      (User.findById as jest.Mock).mockResolvedValueOnce(null);
      
      await expect(inventoryService.transfer(senderId, receiverId, itemId, quantity)).rejects.toThrow(
        new HttpError(`User with id '${senderId}' not found`, 404)
      );
    });

    it('should throw HttpError if receiver not found', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      const sender = { _id: senderId, inventory: [{ itemId: itemId, quantity: 5, equipped: false }] };
      (User.findById as jest.Mock)
        .mockResolvedValueOnce(sender)
        .mockResolvedValueOnce(null);
      
      await expect(inventoryService.transfer(senderId, receiverId, itemId, quantity)).rejects.toThrow(
        new HttpError(`User with id '${receiverId}' not found`, 404)
      );
    });

    it('should throw HttpError if item not found in sender inventory', async () => {
      const senderId = '123';
      const receiverId = '456';
      const itemId = '789';
      const quantity = 2;
      const sender = { _id: senderId, inventory: [] };
      (User.findById as jest.Mock).mockResolvedValueOnce(sender);
      
      await expect(inventoryService.transfer(senderId, receiverId, itemId, quantity)).rejects.toThrow(
        new HttpError(`Item with id '${itemId}' not found in the sender's inventory`, 404)
      );
    });
  });
});