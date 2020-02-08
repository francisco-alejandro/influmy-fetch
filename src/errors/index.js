export class NotAllowedMethodError extends Error {
    constructor() {
        const methods = Object.keys(METHODS).join(',')

        super(`Invalid method. Try with: ${methods}`)
    }
}

export class RequestError extends Error {
    constructor(status) {
        super(`Request failed with status: ${status}`)

        this.status = status
    }
}
