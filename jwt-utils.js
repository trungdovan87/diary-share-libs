'use strict';

const jwt = require('jsonwebtoken')

const createJsonWebToken = (secrteKey, msg, expire, optionHeader) => {
    if (optionHeader === undefined) {
        return jwt.sign({msg}, secrteKey, {algorithm: 'HS256', expiresIn: expire})
    } else {
        return jwt.sign({msg}, secrteKey, {algorithm: 'HS256', expiresIn: expire, header: optionHeader})
    }
}

const verifyJsonWebToken = (secrteKey, token) => {
    return jwt.verify(token, secrteKey).msg
}

module.exports = {
    createJsonWebToken,
    verifyJsonWebToken
}