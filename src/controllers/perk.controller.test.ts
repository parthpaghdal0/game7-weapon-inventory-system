import { Request, Response } from 'express';
import { PerkService } from '../services/perk.service';
import { PerkController } from './perk.controller';

// Mock PerkService
const mockPerkService = {
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

// Initialize PerkController with mocked PerkService
const perkController = new PerkController(mockPerkService as unknown as PerkService);

describe('PerkController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('findAll', () => {
    it('should call service.findAll and send response', async () => {
      const perks = [{ name: 'Perk 1' }, { name: 'Perk 2' }];
      mockPerkService.findAll.mockResolvedValueOnce(perks);
      await perkController.findAll(mockRequest, mockResponse, jest.fn());
      expect(mockPerkService.findAll).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith(perks);
    });
  });

  describe('add', () => {
    it('should call service.add with request body and send response', async () => {
      const newPerk = { name: 'New Perk' };
      mockRequest.body = newPerk;
      mockPerkService.add.mockResolvedValueOnce({ ...newPerk, _id: '123' });
      await perkController.add(mockRequest, mockResponse, jest.fn());
      expect(mockPerkService.add).toHaveBeenCalledWith(newPerk);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...newPerk, _id: '123' });
    });
  });

  describe('find', () => {
    it('should call service.find with perk id and send response', async () => {
      const perkId = '123';
      const foundPerk = { _id: perkId, name: 'Found Perk' };
      mockPerkService.find.mockResolvedValueOnce(foundPerk);
      mockRequest.params = { id: perkId };
      await perkController.find(mockRequest, mockResponse, jest.fn());
      expect(mockPerkService.find).toHaveBeenCalledWith(perkId);
      expect(mockResponse.send).toHaveBeenCalledWith(foundPerk);
    });
  });

  describe('delete', () => {
    it('should call service.delete with perk id and send response', async () => {
      const perkId = '123';
      const deletedPerk = { _id: perkId, name: 'Deleted Perk' };
      mockPerkService.delete.mockResolvedValueOnce(deletedPerk);
      mockRequest.params = { id: perkId };
      await perkController.delete(mockRequest, mockResponse, jest.fn());
      expect(mockPerkService.delete).toHaveBeenCalledWith(perkId);
      expect(mockResponse.send).toHaveBeenCalledWith(deletedPerk);
    });
  });

  describe('update', () => {
    it('should call service.update with perk id and request body, and send response', async () => {
      const perkId = '123';
      const updatedPerk = { name: 'Updated Perk' };
      mockPerkService.update.mockResolvedValueOnce({ ...updatedPerk, _id: perkId });
      mockRequest.params = { id: perkId };
      mockRequest.body = updatedPerk;
      await perkController.update(mockRequest, mockResponse, jest.fn());
      expect(mockPerkService.update).toHaveBeenCalledWith(perkId, updatedPerk);
      expect(mockResponse.send).toHaveBeenCalledWith({ ...updatedPerk, _id: perkId });
    });
  });
});
