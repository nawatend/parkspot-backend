export default class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export const handleAPIError = (status, message, next) => {
    const error = new APIError(status, message);
    return next(error);
};
