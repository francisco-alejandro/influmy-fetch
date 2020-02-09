import { useState, useCallback } from 'react';

import { optionProvider, urlProvider } from '../providers';
import { METHODS } from '../constants';

const useFetch = ({ method = METHODS.GET }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false, status: null });

  const callAPI = useCallback(
    async ({ url, headers, query, payload }) => {
      const options = optionProvider({ method, headers, payload });
      const encondedUrl = urlProvider({ url, query });

      setRes({ data: null, error: false, isLoading: true, status: null });

      try {
        const response = await fetch(encondedUrl.toJSON(), options);
        const data = await response.json();

        setRes({ data, isLoading: false, error: !response.ok, status: response.status });
      } catch (error) {
        setRes({ data: null, isLoading: false, error: true, status: null });
      }
    },
    [method],
  );

  return [res, callAPI];
};

export default useFetch;
