'use strict';

const HttpError = require('./http-error')

class NotFoundError extends HttpError {
  constructor(code, msg) {
    super('Note-Found Error', code, msg)
  }
}

module.exports = NotFoundError