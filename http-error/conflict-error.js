'use strict';

const HttpError = require('./http-error')

class ConflictError extends HttpError {
  constructor(code, msg) {
    super('Conflict Error', code, msg)
  }
}

module.exports = ConflictError