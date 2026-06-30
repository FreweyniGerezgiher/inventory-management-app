const success = (data = null, message = "") => {
    return {
        success: true,
        message,
        data,
        errors: null
    };
};

const error = (message = "", errors = null) => {
    return {
        success: false,
        message,
        data: null,
        errors
    };
};

module.exports = {
    success,
    error
};