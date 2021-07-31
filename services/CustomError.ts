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

    static unAuthorized(errorMessage = `Unauthorized. Access denied`) {
        return new CustomError(401, 'failed', errorMessage);
    }

    static badRequest(errorMessage = `Bad Request`) {
        return new CustomError(400, 'failed', errorMessage);
    }

    static serverError(errorMessage = `Internal server error`) {
        return new CustomError(500, 'failed', errorMessage);
    }
}

export default CustomError;
