const httpError = require('./http-error')

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

const OK = 'ok'
const UNKNOWN = 'unknown'

const createPayload = (code, payload, msg) => ({
    code, payload, msg
})

const createResponse = (statusCode, code, payload, msg) => {
    return addCorsHeaders({
        statusCode,
        body: JSON.stringify(createPayload(code, payload, msg)),
    })
}

const createOkResponse = (payload) => createResponse(200, OK, payload)

const createErrorResponse = (statusCode, code, msg) => createResponse(statusCode, code, undefined, msg)

const createConflictResponse = (code, msg) => createErrorResponse(409, code, msg)

const createForbiddenResponse = (code, msg) => createErrorResponse(403, code, msg)

const createUnknownResponse = (msg) => createErrorResponse(500, UNKNOWN, msg)

const supportHandler = (handler) => async (event, context) => {
    try {
        return await handler(event, context)
    } catch (error) {
        if (error instanceof httpError.ForbiddenError) {   
            return createForbiddenResponse(error.code, error.msg)
        } else if (error instanceof httpError.ConflictError) {
            return createConflictResponse(error.code, error.msg)
        } else if (error instanceof httpError.HttpError) {
            return createErrorResponse(error.statusCode, error.code, error.msg)
        } else {
            console.error(error)
            return createUnknownResponse(error.message)
        }        
    }
}

module.exports = {
    supportHandler,
    addCorsHeaders,   
    createOkResponse,
    createErrorResponse,
    createConflictResponse, 
    createUnknownResponse,   
    createForbiddenResponse,
    createUnknownResponse,
}
