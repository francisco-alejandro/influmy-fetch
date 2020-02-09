import { optionProvider } from '../src/providers';
import { NotAllowedMethodError } from '../src/errors';
import { METHODS } from '../src/constants';

describe('optionProvider', () => {
  it('raises exception if an invalid method is provided', () => {
    expect(() => {
      optionProvider({ method: 'FOO' });
    }).toThrow(NotAllowedMethodError);
  });

  it('sets headers if them are provided', () => {
    const headers = {
      foo: 'bar',
    };
    const expectedOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    const options = optionProvider({ method: METHODS.GET, headers });

    expect(options).toEqual(expectedOptions);
  });

  it('sets body if it is provided and request is a valid method', () => {
    const payload = {
      foo: 'bar',
    };
    const expectedOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const options = optionProvider({ method: METHODS.POST, payload });

    expect(options).toEqual(expectedOptions);
  });
});
