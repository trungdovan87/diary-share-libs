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

module.exports = {
    addCorsHeaders,    
    createOkResponse,
    createErrorResponse,
    createConflictResponse, 
    createUnknownResponse,   
    createForbiddenResponse,
    createUnknownResponse,
}
