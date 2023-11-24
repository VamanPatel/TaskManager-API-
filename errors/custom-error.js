class CustomAPIError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }