'use strict';

const getPathParam = (event, param) => {
  return event.pathParameters[param]
}

const getBody = (event) => {
  return JSON.parse(event.body)
}

const getHeader = (event, header) => event.headers[header]

const getMutiValueQueryParam = (event, param) => {
  const params = event.multiValueQueryStringParameters
  return params && params[param]
}

const getValueQueryParam = (event, param) => {
  const params = event.queryStringParameters[param]
  return params && params[param]
}

const getPrincipalId = (event) => event.requestContext.authorizer.principalId

const getEnviroment = (variable) => process.env[variable]

module.exports = {
  getPathParam,
  getBody,
  getMutiValueQueryParam,
  getValueQueryParam,
  getHeader,
  getPrincipalId,
  getEnviroment,
}