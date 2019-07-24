'use strict';

const getBody = (event) => {
  return JSON.parse(event.body)
}

const getHeader = (event, header) => event.headers[header]

const getParam = (event, path, param) => {
  const params = event[path]
  return params && params[param]
}

const getMutiValueQueryParam = (event, param) => getParam(event, 'multiValueQueryStringParameters', param)

const getValueQueryParam = (event, param) => getParam(event, 'queryStringParameters', param)

const getPathParam = (event, param) => getParam(event, 'pathParameters', param)

const getPrincipalId = (event) => event.requestContext.authorizer.principalId

const getEnviroment = (variable) => process.env[variable]

module.exports = {
  getBody,
  getMutiValueQueryParam,
  getValueQueryParam,
  getPathParam,
  getHeader,
  getPrincipalId,
  getEnviroment,  
}