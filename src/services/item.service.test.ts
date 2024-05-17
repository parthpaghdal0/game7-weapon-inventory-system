import { ItemService } from './item.service';
import { HttpError } from '../errors/http.error';
import { IItem } from '../interfaces/item.interface';
import Item from '../models/item.model';

jest.mock('../models/item.model');

describe('ItemService', () => {
  let itemService: ItemService;

  beforeEach(() => {
    itemService = new ItemService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const items = [{ name: 'Item 1' }, { name: 'Item 2' }];
      (Item.find as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(items),
      });

      const result = await itemService.findAll();

      expect(result).toEqual(items);
    });
  });

  describe('add', () => {
    it('should add a new item', async () => {
      const newItem = { name: 'New Item' };
      const savedItem = { ...newItem, _id: '1' };
      const saveMock = jest.fn().mockResolvedValueOnce(savedItem);
      jest.spyOn(Item.prototype, 'save').mockImplementationOnce(saveMock);

      const result = await itemService.add(newItem);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(savedItem);
    });
  });

  describe('find', () => {
    it('should find an item by id', async () => {
      const itemId = '1';
      const item = { _id: itemId, name: 'Item 1' };
      (Item.findById as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(item),
      });

      const result = await itemService.find(itemId);

      expect(result).toEqual(item);
    });
  });

  describe('delete', () => {
    it('should delete an item by id', async () => {
      const itemId = '123';
      const deletedItem = { _id: itemId, name: 'Deleted Item' };
      (Item.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedItem);
      const result = await itemService.delete(itemId);
      expect(result).toEqual(deletedItem);
    });

    it('should throw HttpError if item not found', async () => {
      const itemId = '456';
      (Item.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
      await expect(itemService.delete(itemId)).rejects.toThrow(
        new HttpError(`Item with id '${itemId}' not found`, 404)
      );
    });
  });

  describe('update', () => {
    it('should update an item by id', async () => {
      const itemId = '123';
      const updatedItem = { _id: itemId, name: 'Updated Item' };
      (Item.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedItem);
      const result = await itemService.update(itemId, updatedItem);
      expect(result).toEqual(updatedItem);
    });

    it('should throw HttpError if item not found', async () => {
      const itemId = '456';
      const updatedItem: Partial<IItem> = { name: 'Updated Item' };
      (Item.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);
      await expect(itemService.update(itemId, updatedItem)).rejects.toThrow(
        new HttpError(`Item with id '${itemId}' not found`, 404)
      );
    });
  });
});
