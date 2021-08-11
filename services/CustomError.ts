class CustomError extends Error {
    code: number;
    status: string;
    constructor(code: number, status: string, message: string) {
        super();
        this.code = code;
        this.status = status;
        this.message = message;
    }

    static alreadyExists(errorMessage = 'Resource already exists', status = 'failed') {
        return new CustomError(209, status, errorMessage);
    }

    static notFound(errorMessage = 'Resource not found', status = 'failed') {
        return new CustomError(404, status, errorMessage);
    }

    static invalidCredentials(errorMessage = 'Invalid credentails', status = 'failed') {
        return new CustomError(401, status, errorMessage);
    }

    static unAuthorized(errorMessage = `Unauthorized. Access denied`, status = 'failed') {
        return new CustomError(401, status, errorMessage);
    }

    static badRequest(errorMessage = `Bad Request`, status = 'failed') {
        return new CustomError(400, status, errorMessage);
    }

    static serverError(errorMessage = `Internal server error`, status = 'failed') {
        return new CustomError(500, status, errorMessage);
    }
}

export default CustomError;
