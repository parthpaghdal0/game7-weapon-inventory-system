import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

// Mocking UserService
const mockUserService = {
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

// Initialize UserController with mocked UserService
const userController = new UserController(mockUserService as unknown as UserService);

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('findAll', () => {
    it('should call service.findAll and send response', async () => {
      mockUserService.findAll.mockResolvedValueOnce([{ name: 'User 1' }]);
      await userController.findAll(mockRequest, mockResponse, jest.fn());
      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith([{ name: 'User 1' }]);
    });
  });

  describe('add', () => {
    it('should call service.add with request body and send response', async () => {
      const requestBody = { name: 'New User' };
      mockRequest.body = requestBody;
      mockUserService.add.mockResolvedValueOnce({ ...requestBody, _id: '123' });
      await userController.add(mockRequest, mockResponse, jest.fn());
      expect(mockUserService.add).toHaveBeenCalledWith(requestBody);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...requestBody, _id: '123' });
    });
  });

  describe('find', () => {
    it('should call service.find with user id and send response', async () => {
      const userId = '123';
      mockUserService.find.mockResolvedValueOnce({ _id: userId, name: 'User 1' });
      mockRequest.params = { id: userId };
      await userController.find(mockRequest, mockResponse, jest.fn());
      expect(mockUserService.find).toHaveBeenCalledWith(userId);
      expect(mockResponse.send).toHaveBeenCalledWith({ _id: userId, name: 'User 1' });
    });
  });

  describe('delete', () => {
    it('should call service.delete with user id and send response', async () => {
      const userId = '123';
      mockUserService.delete.mockResolvedValueOnce({ _id: userId, name: 'Deleted User' });
      mockRequest.params = { id: userId };
      await userController.delete(mockRequest, mockResponse, jest.fn());
      expect(mockUserService.delete).toHaveBeenCalledWith(userId);
      expect(mockResponse.send).toHaveBeenCalledWith({ _id: userId, name: 'Deleted User' });
    });
  });

  describe('update', () => {
    it('should call service.update with user id and request body, and send response', async () => {
      const userId = '123';
      const requestBody = { name: 'Updated User' };
      mockUserService.update.mockResolvedValueOnce({ ...requestBody, _id: userId });
      mockRequest.params = { id: userId };
      mockRequest.body = requestBody;
      await userController.update(mockRequest, mockResponse, jest.fn());
      expect(mockUserService.update).toHaveBeenCalledWith(userId, requestBody);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...requestBody, _id: userId });
    });
  });
});
