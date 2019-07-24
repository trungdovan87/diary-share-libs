'use strict';

const HttpError = require('./http-error')

class ForbiddenError extends HttpError {
  constructor(code, msg) {
    super('Forbidden Error', code, msg)
  }
}

module.exports = ForbiddenError