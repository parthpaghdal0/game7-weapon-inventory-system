import { PerkService } from './perk.service';
import { HttpError } from '../errors/http.error';
import { IPerk } from '../interfaces/perk.interface';
import Perk from '../models/perk.model';

jest.mock('../models/perk.model');

describe('PerkService', () => {
  let perkService: PerkService;

  beforeEach(() => {
    perkService = new PerkService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all perks', async () => {
      const perks = [{ name: 'Perk 1' }, { name: 'Perk 2' }];
      (Perk.find as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(perks),
      });

      const result = await perkService.findAll();

      expect(result).toEqual(perks);
    });
  });

  describe('add', () => {
    it('should add a new perk', async () => {
      const newPerk = { name: 'New Perk' };
      const savedPerk = { ...newPerk, _id: '1' };
      const saveMock = jest.fn().mockResolvedValueOnce(savedPerk);
      jest.spyOn(Perk.prototype, 'save').mockImplementationOnce(saveMock);

      const result = await perkService.add(newPerk);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(savedPerk);
    });
  });

  describe('find', () => {
    it('should find a perk by id', async () => {
      const perkId = '1';
      const perk = { _id: perkId, name: 'Perk 1' };
      (Perk.findById as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(perk),
      });

      const result = await perkService.find(perkId);

      expect(result).toEqual(perk);
    });
  });

  describe('delete', () => {
    it('should delete a perk by id', async () => {
      const perkId = '123';
      const deletedPerk = { _id: perkId, name: 'Deleted Perk' };
      (Perk.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedPerk);
      const result = await perkService.delete(perkId);
      expect(result).toEqual(deletedPerk);
    });

    it('should throw HttpError if perk not found', async () => {
      const perkId = '456';
      (Perk.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
      await expect(perkService.delete(perkId)).rejects.toThrow(
        new HttpError(`Perk with id '${perkId}' not found`, 404)
      );
    });
  });

  describe('update', () => {
    it('should update a perk by id', async () => {
      const perkId = '123';
      const updatedPerk = { _id: perkId, name: 'Updated Perk' };
      (Perk.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedPerk);
      const result = await perkService.update(perkId, updatedPerk);
      expect(result).toEqual(updatedPerk);
    });

    it('should throw HttpError if perk not found', async () => {
      const perkId = '456';
      const updatedPerk: Partial<IPerk> = { name: 'Updated Perk' };
      (Perk.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);
      await expect(perkService.update(perkId, updatedPerk)).rejects.toThrow(
        new HttpError(`Perk with id '${perkId}' not found`, 404)
      );
    });
  });
});