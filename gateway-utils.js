const httpError = require('./http-error')
const errorCode = require('./error-code')

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
}

const addCorsHeaders = (response) => {
    const headers = !response.headers ? CORS_HEADERS : {
        ...CORS_HEADERS,
        ...response.headers
    }
    return {
        ...response,
        headers,
    }
}

const createPayload = (code, payload, msg) => ({
    code, payload, msg
})

const createResponse = (statusCode, code, payload, msg) => {
    return addCorsHeaders({
        statusCode,
        body: JSON.stringify(createPayload(code, payload, msg)),
    })
}

const createOkResponse = (payload) => createResponse(200, errorCode.OK, payload)

const createCreatedResponse = (payload) => createResponse(201, errorCode.OK, payload)

const createErrorResponse = (statusCode, code, msg) => createResponse(statusCode, code, undefined, msg)

const createConflictResponse = (code, msg) => createErrorResponse(409, code, msg)

const createForbiddenResponse = (code, msg) => createErrorResponse(403, code, msg)

const createBadRequestResponse = (code, msg) => createErrorResponse(400, code, msg)

const createNotFoundResponse = (code, msg) => createErrorResponse(404, code, msg)

const createInternalServerResponse = (code, msg) => createErrorResponse(500, code, msg)

const createUnknownResponse = (msg) => createErrorResponse(500, errorCode.UNKNOWN, msg)

class ErrorConfigure {
    constructor(errorClass, createResponseMethod) {
        this.errorClass = errorClass
        this.createResponseMethod = createResponseMethod
    }
}

const errorConfigs = [
    new ErrorConfigure(httpError.ForbiddenError, createForbiddenResponse),
    new ErrorConfigure(httpError.ConflictError, createConflictResponse),
    new ErrorConfigure(httpError.BadRequestError, createBadRequestResponse),
    new ErrorConfigure(httpError.NotFoundError, createNotFoundResponse),
    new ErrorConfigure(httpError.InternalServerError, createInternalServerResponse),
]

const supportHandler = (handler) => async (event, context) => {
    console.log('***** event:', JSON.stringify(event))
    try {
        return await handler(event, context)
    } catch (error) {
        for (const config of errorConfigs){
            if (error instanceof config.errorClass) {
                return config.createResponseMethod(error.code, error.msg)
            }
        }            
        if (error instanceof httpError.HttpError) {
            // general Http Error
            return createErrorResponse(error.statusCode, error.code, error.msg)
        } else {
            // unknow error
            console.error('***** Unknown Error:', error)
            return createUnknownResponse(error.message)
        }        
    }
}

const throwInvalidDataError = (msg) => {
    throw new httpError.BadRequestError(
        errorCode.INVALID_DATA,
        msg,
    )
}

const throwIfInvalid = (validatorResult) => {
    const { errors } = validatorResult
    if (!!errors.length) {
        throwInvalidDataError(errors[0].stack)
    }
}

module.exports = {
    errorCode,
    supportHandler,
    addCorsHeaders,   
    createOkResponse,
    createCreatedResponse,
    createErrorResponse,
    createConflictResponse, 
    createUnknownResponse,   
    createForbiddenResponse,
    createNotFoundResponse,
    throwInvalidDataError,
    throwIfInvalid,
}
