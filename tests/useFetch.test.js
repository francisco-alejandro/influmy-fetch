import { renderHook, act } from '@testing-library/react-hooks';

import { useFetch } from '../src';

describe('useFetch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns initial data state', () => {
    const {
      result: {
        current: [res],
      },
    } = renderHook(() => useFetch({}));

    expect(res).toStrictEqual({ data: null, error: null, isLoading: false, status: null });
  });

  it('sets error to true if request fails', async () => {
    const url = 'http://foo.bar';
    const { result, waitForNextUpdate } = renderHook(() => useFetch({}));

    fetch.mockReject(new Error('fake error message'));

    await act(async () => {
      const [, callback] = result.current;
      callback({ url });

      await waitForNextUpdate();
      const [res] = result.current;

      expect(res).toStrictEqual({ data: null, error: true, isLoading: false, status: null });
    });
  });

  it('sets data to true if request is success', async () => {
    const url = 'http://foo.bar';
    const { result, waitForNextUpdate } = renderHook(() => useFetch({}));

    fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));

    await act(async () => {
      const [, callback] = result.current;
      callback({ url });

      await waitForNextUpdate();
      const [res] = result.current;

      expect(res).toStrictEqual({
        data: {
          foo: 'bar',
        },
        error: false,
        isLoading: false,
        status: 200,
      });
    });
  });
});
