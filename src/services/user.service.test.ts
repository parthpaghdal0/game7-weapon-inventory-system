import { UserService } from './user.service';
import { HttpError } from '../errors/http.error';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

jest.mock('../models/user.model');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ name: 'User 1' }, { name: 'User 2' }];
      (User.find as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(users),
      });

      const result = await userService.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('add', () => {
    it('should add a new user', async () => {
      const newUser = { name: 'New User' };
      const savedUser = { ...newUser, _id: '1' };
      const saveMock = jest.fn().mockResolvedValueOnce(savedUser);
      jest.spyOn(User.prototype, 'save').mockImplementationOnce(saveMock);

      const result = await userService.add(newUser);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(savedUser);
    });
  });

  describe('find', () => {
    it('should find a user by id', async () => {
      const userId = '1';
      const user = { _id: userId, name: 'User 1' };
      (User.findById as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      });

      const result = await userService.find(userId);

      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const userId = '123';
      const deletedUser = { _id: userId, name: 'Deleted User' };
      (User.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedUser);
      const result = await userService.delete(userId);
      expect(result).toEqual(deletedUser);
    });

    it('should throw HttpError if user not found', async () => {
      const userId = '456';
      (User.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
      await expect(userService.delete(userId)).rejects.toThrow(
        new HttpError(`User with id '${userId}' not found`, 404)
      );
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const userId = '123';
      const updatedUser = { _id: userId, name: 'Updated User' };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedUser);
      const result = await userService.update(userId, updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('should throw HttpError if user not found', async () => {
      const userId = '456';
      const updatedUser: Partial<IUser> = { name: 'Updated User' };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);
      await expect(userService.update(userId, updatedUser)).rejects.toThrow(
        new HttpError(`User with id '${userId}' not found`, 404)
      );
    });
  });
});
