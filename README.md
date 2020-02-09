# @influmy/fetch
[![codecov](https://codecov.io/gh/francisco-alejandro/influmy-fetch/branch/master/graph/badge.svg)](https://codecov.io/gh/francisco-alejandro/influmy-fetch)

Hook to make http request in an easy and fancy manner. It uses fetch, so it is light and fast. No over engineering architecture needed. 

```javascript
import React, { useEffect } from 'react';
import { useFetch, METHODS } from '@influmy/fecth';

const Demo = () => {
	const [res, callApi] = useFetch({});
	useEffect(() => {
		const query = {
			postId: 1,
		};
		const url = 'https://jsonplaceholder.typicode.com/comments';
		callApi({ url, query });
	}, [callApi]);

	const { isLoading, data } = res;
	if (isLoading)  {
		return <p>Loading</p>;
	}
	
	return <pre>{JSON.stringify(data)}</pre>;
};
```

useFetch({ method }) hooks should be called with a valid http request method. GET, POST, PUT, PATCH, DELETE. By default it uses GET. You can get methods constants throw METHODS object, like METHODS.POST and others.

It returns a **response object**, with these properties:

 - data: JSON format response
 - error: boolean, saying if an error occurs
 - isLoading: boolean. It is set as loading before each request, when it is successful or fails, is set to false
 - status: HTTP response status.

A **call api function** is returned too. 
callApi({ url, query, payload })
You can set url, where request is made. Can be a string or a URL object instance. Query object, to add query params to url. Makes pagination simple. And a payload object, to set as a body in request.

So instead of making a hooks that makes request, and you call feel upset with lifecycles, this hook provides tools to manage your request and make them whenever you need it
