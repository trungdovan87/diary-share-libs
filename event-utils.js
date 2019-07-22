'use strict';

const getPathParam = (event, param) => {
  return event.pathParameters[param]
}

const getBody = (event) => {
  return JSON.parse(event.body)
}

const getMutiValueQueryParam = (event, param) => event.multiValueQueryStringParameters[param]

const getValueQueryParam = (event, param) => event.queryStringParameters[param]

module.exports = {
  getPathParam,
  getBody,
  getMutiValueQueryParam,
  getValueQueryParam,
}