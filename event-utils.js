const getParamFromEvent = (event, param) => {
    return event.pathParameters[param]
}

module.exports = {
    getParamFromEvent,
}