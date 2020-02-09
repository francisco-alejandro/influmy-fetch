import React, { useEffect } from 'react'
import {render} from 'react-dom'

import { useFetch } from '../../src'

const Demo  = () => {
  const query = {
    postId: 1,
  }
  const url = 'https://jsonplaceholder.typicode.com/comments'
  const [res, callApi] = useFetch({})

  useEffect(() => {
    callApi({ url, query })
  }, [])

  const { isLoading, data } = res

  if (isLoading) {
    return <p>Is loading...</p>
  }

  return <pre>{JSON.stringify(data)}</pre>
}


render(<Demo/>, document.querySelector('#demo'))
