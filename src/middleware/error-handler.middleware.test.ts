import { handleErrors } from './error-handler.middleware';
import { GenericError } from '../interfaces/generic-error.interface';
import { Request, Response } from 'express';

describe('handleErrors', () => {
  it('should handle generic error correctly', () => {
    const err: GenericError = {
      name: 'CustomError',
      message: 'Test error',
      status: 404,
    };
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    handleErrors(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Test error');
  });

  it('should handle error with default status correctly', () => {
    const err: GenericError = {
      name: 'CustomError',
      message: 'Test error',
    };
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    handleErrors(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Test error');
  });
});
