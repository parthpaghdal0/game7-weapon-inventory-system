import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { ItemController } from './item.controller';

// Mocking ItemService
const mockItemService = {
  findAll: jest.fn(),
  add: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

// Mock Express Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  send: jest.fn(),
} as unknown as Response;

// Initialize ItemController with mocked ItemService
const itemController = new ItemController(mockItemService as unknown as ItemService);

describe('ItemController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('findAll', () => {
    it('should call service.findAll and send response', async () => {
      mockItemService.findAll.mockResolvedValueOnce([{ name: 'Item 1' }]);
      await itemController.findAll(mockRequest, mockResponse, jest.fn());
      expect(mockItemService.findAll).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith([{ name: 'Item 1' }]);
    });
  });

  describe('add', () => {
    it('should call service.add with request body and send response', async () => {
      const requestBody = { name: 'New Item' };
      mockRequest.body = requestBody;
      mockItemService.add.mockResolvedValueOnce({ ...requestBody, _id: '123' });
      await itemController.add(mockRequest, mockResponse, jest.fn());
      expect(mockItemService.add).toHaveBeenCalledWith(requestBody);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...requestBody, _id: '123' });
    });
  });

  describe('find', () => {
    it('should call service.find with item id and send response', async () => {
      const itemId = '123';
      mockItemService.find.mockResolvedValueOnce({ _id: itemId, name: 'Item 1' });
      mockRequest.params = { id: itemId };
      await itemController.find(mockRequest, mockResponse, jest.fn());
      expect(mockItemService.find).toHaveBeenCalledWith(itemId);
      expect(mockResponse.send).toHaveBeenCalledWith({ _id: itemId, name: 'Item 1' });
    });
  });

  describe('delete', () => {
    it('should call service.delete with item id and send response', async () => {
      const itemId = '123';
      mockItemService.delete.mockResolvedValueOnce({ _id: itemId, name: 'Deleted Item' });
      mockRequest.params = { id: itemId };
      await itemController.delete(mockRequest, mockResponse, jest.fn());
      expect(mockItemService.delete).toHaveBeenCalledWith(itemId);
      expect(mockResponse.send).toHaveBeenCalledWith({ _id: itemId, name: 'Deleted Item' });
    });
  });

  describe('update', () => {
    it('should call service.update with item id and request body, and send response', async () => {
      const itemId = '123';
      const requestBody = { name: 'Updated Item' };
      mockItemService.update.mockResolvedValueOnce({ ...requestBody, _id: itemId });
      mockRequest.params = { id: itemId };
      mockRequest.body = requestBody;
      await itemController.update(mockRequest, mockResponse, jest.fn());
      expect(mockItemService.update).toHaveBeenCalledWith(itemId, requestBody);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...requestBody, _id: itemId });
    });
  });
});
