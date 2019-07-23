'use strict';

const jwt = require('jsonwebtoken')

const createJsonWebToken = (secrteKey, payload, expire, optionHeader) => {
    if (optionHeader === undefined) {
        return jwt.sign({ ...payload }, secrteKey, {algorithm: 'HS256', expiresIn: expire})
    } else {
        return jwt.sign({ ...payload }, secrteKey, {algorithm: 'HS256', expiresIn: expire, header: optionHeader})
    }
}

const verifyJsonWebToken = (secrteKey, token) => {
    return jwt.verify(token, secrteKey)
}

module.exports = {
    createJsonWebToken,
    verifyJsonWebToken
}