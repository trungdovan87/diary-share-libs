'use strict';

const HttpError = require('./http-error')

class InternalServerError extends HttpError {
  constructor(code, msg) {
    super('Internal-Server Error', code, msg)
  }
}

module.exports = InternalServerError