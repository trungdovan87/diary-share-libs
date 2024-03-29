'use strict';

const gatewayUtils = require('./gateway-utils')

const getBody = (event) => {
  try {
    return JSON.parse(event.body)
  } catch (err) {
    gatewayUtils.throwInvalidDataError('Body is not JSON format!')
  }
}

const getHeader = (event, header) => event.headers[header]

const getParam = (event, path, param) => {
  const params = event[path]
  return params && params[param]
}

const getMutiValueQueryParam = (event, param) => getParam(event, 'multiValueQueryStringParameters', param)

const getQueryParam = (event, param) => getParam(event, 'queryStringParameters', param)

const getPathParam = (event, param) => getParam(event, 'pathParameters', param)

const getPrincipalId = (event) => event.requestContext.authorizer.principalId

const getEnviroment = (variable) => process.env[variable]

module.exports = {
  getBody,
  getMutiValueQueryParam,
  getQueryParam,
  getPathParam,
  getHeader,
  getPrincipalId,
  getEnviroment,  
}