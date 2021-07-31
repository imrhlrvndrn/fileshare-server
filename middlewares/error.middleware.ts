import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../services';
import { errorResponse } from '../utils/';

const errorHandler = (
    error: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let data = { code: 500, status: 'failed', message: 'Internal server error' };

    if (error instanceof CustomError) {
        data = {
            code: error.code,
            status: error.status,
            message: error.message,
        };
    }

    return errorResponse(res, data);
};

export { errorHandler };
