'use strict';

class HttpError extends Error {
  constructor(message, code, msg, statusCode) {
    super(message)
    this.code = code
    this.msg = msg
    this.statusCode = statusCode
  }
}

module.exports = HttpError