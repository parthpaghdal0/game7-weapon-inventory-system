import { HttpError } from './http.error';

describe('HttpError', () => {
  it('should create an instance of HttpError with correct message and status', () => {
    const message = 'Not Found';
    const status = 404;
    const httpError = new HttpError(message, status);
    expect(httpError.message).toBe(message);
    expect(httpError.status).toBe(status);
  });

  it('should inherit from Error', () => {
    const httpError = new HttpError('Test Error', 500);
    expect(httpError).toBeInstanceOf(Error);
  });

  it('should have correct name', () => {
    const httpError = new HttpError('Test Error', 500);
    expect(httpError.name).toBe('Error');
  });
});