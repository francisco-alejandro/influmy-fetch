import React, { useEffect } from 'react'
import {render} from 'react-dom'

import { useFetch } from '../../src'

const Demo  = () => {
  const query = {
    postId: 1,
  }
  const [res, callApi] = useFetch({
    url: 'https://jsonplaceholder.typicode.com/comments',
  })

  useEffect(() => {
    callApi({ query })
  }, [])

  const { isLoading, data } = res

  if (isLoading) {
    return <p>Is loading...</p>
  }

  return <pre>{JSON.stringify(data)}</pre>
}


render(<Demo/>, document.querySelector('#demo'))
