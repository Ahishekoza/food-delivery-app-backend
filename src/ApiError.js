class ApiError extends Error {
    constructor(statusCode , message ){
        super(message)
        this.statusCode = statusCode
        this.message = message || 'Something went wrong'

    }
}


export {ApiError}