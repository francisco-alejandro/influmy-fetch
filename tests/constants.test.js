import { METHODS } from '../src';

describe('constants', () => {
  it('returns a read only constants', () => {
    expect(() => {
      METHODS.FOO = 'bar';
    }).toThrow(TypeError);
  });
});
