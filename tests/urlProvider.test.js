import { urlProvider } from '../src/providers';

describe('urlProvider', () => {
  it('retuns an URL object if a string is provided', () => {
    const url = 'http://foo.bar';
    const encodedUrl = urlProvider({ url });

    expect(encodedUrl instanceof URL).toBeTruthy();
  });

  it('retuns an URL object with query params', () => {
    const url = new URL('http://foo.bar/');
    const query = {
      key: 'value',
    };
    const encodedUrl = urlProvider({ url, query });

    expect(encodedUrl.toJSON()).toEqual('http://foo.bar/?key=value');
  });
});
