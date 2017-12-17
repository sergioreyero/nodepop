'use strict';

function customError(message, statusCode) {

    const error = new Error(message);
    error.status = statusCode;

    return error;
}

module.exports = customError;