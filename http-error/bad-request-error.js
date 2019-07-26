'use strict';

const HttpError = require('./http-error')

class BadRequestError extends HttpError {
  constructor(code, msg) {
    super('Bad-Request Error', code, msg)
  }
}

module.exports = BadRequestError