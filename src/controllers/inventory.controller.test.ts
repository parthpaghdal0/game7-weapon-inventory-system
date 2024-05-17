import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { InventoryController } from './inventory.controller';

// Mocking InventoryService
const mockInventoryService = {
  discard: jest.fn(),
  equip: jest.fn(),
  transfer: jest.fn(),
};

// Mock Express Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  send: jest.fn(),
} as unknown as Response;

// Initialize InventoryController with mocked InventoryService
const inventoryController = new InventoryController(mockInventoryService as unknown as InventoryService);

describe('InventoryController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('discard', () => {
    it('should call service.discard with user id and item id, and send response', async () => {
      const userId = 'user123';
      const itemId = 'item456';
      const expectedResult = { success: true };
      mockRequest.body = { userId, itemId };
      mockInventoryService.discard.mockResolvedValueOnce(expectedResult);
      await inventoryController.discard(mockRequest, mockResponse, jest.fn());
      expect(mockInventoryService.discard).toHaveBeenCalledWith(userId, itemId);
      expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('equip', () => {
    it('should call service.equip with user id and item id, and send response', async () => {
      const userId = 'user123';
      const itemId = 'item456';
      const expectedResult = { success: true };
      mockRequest.body = { userId, itemId };
      mockInventoryService.equip.mockResolvedValueOnce(expectedResult);
      await inventoryController.equip(mockRequest, mockResponse, jest.fn());
      expect(mockInventoryService.equip).toHaveBeenCalledWith(userId, itemId);
      expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('transfer', () => {
    it('should call service.transfer with sender id, receiver id, item id, quantity, and send response', async () => {
      const senderId = 'sender123';
      const receiverId = 'receiver456';
      const itemId = 'item789';
      const quantity = 5;
      const expectedResult = { success: true };
      mockRequest.body = { senderId, receiverId, itemId, quantity };
      mockInventoryService.transfer.mockResolvedValueOnce(expectedResult);
      await inventoryController.transfer(mockRequest, mockResponse, jest.fn());
      expect(mockInventoryService.transfer).toHaveBeenCalledWith(senderId, receiverId, itemId, quantity);
      expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
    });
  });
});
