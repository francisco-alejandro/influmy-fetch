import { useState, useCallback } from 'react'

import { optionProvider, urlProvider } from '../providers'
import { RequestError } from '../errors'
import { METHODS } from '../constants'

const useFetch = ({ url, method = METHODS.GET }) => {
    const [res, setRes] = useState({ data: null, error: null, isLoading: false, status: null })
    
    const callAPI = useCallback(async ({ headers, query, payload }) => {
        const options = optionProvider({ method, headers, payload })
        const encondedUrl = urlProvider({ url, query })

        setRes(prevState => ({ ...prevState, isLoading: true }))

        try {
            const response = await fetch(encondedUrl, options)

            if (response.ok) {
                const data = await response.json()
                setRes({ data, isLoading: false, error: null, status: response.status })
            } else {
                throw new RequestError(response.status)
            }
        } catch (error) {
            setRes({ data: null, isLoading: false, error, status: error.status || 500 })
        }
    }, [url, method])

    return [res, callAPI]
}

export default useFetch