import { METHODS } from '../constants'
import { NotAllowedMethodError } from '../errors'

const headersProvider = headers => {
    const basicHeaders = {
        'Content-Type': 'application/json',
    }
    if (headers === Object(headers)) {
        return Object.assign({}, basicHeaders, headers)
    }

    return basicHeaders
}

const methodProvider = method => {
    const value = METHODS[method]

    if (!value) {
        throw new NotAllowedMethodError
    }

    return value
}

const optionProvider = ({ method, headers, payload = {} }) => {
    const options = {
        method: methodProvider(method),
        headers: headersProvider(headers),
    }
    if (options.method !== METHODS.GET && options.method !== METHODS.DELETE) {
        options.body = JSON.stringify(payload);
    }

    return options
}


export default optionProvider