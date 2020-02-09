import { METHODS } from '../constants';

export class NotAllowedMethodError extends Error {
  constructor() {
    const methods = Object.keys(METHODS).join(',');

    super(`Invalid method. Try with: ${methods}`);
  }
}
