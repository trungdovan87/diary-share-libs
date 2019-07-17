const getParamFromEvent = (event, param) => {
    return event.pathParameters[param]
}

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

module.exports = {
    getParamFromEvent,
    addCorsHeaders
}