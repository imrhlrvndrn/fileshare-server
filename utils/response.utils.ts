import { Response } from 'express';

const errorResponse = (
    res: Response,
    { code = 500, message = 'Internal Server Error', status = 'failed' }
) => {
    return res.status(+code).json({
        statusCode: +code,
        message,
        status,
    });
};

const successResponse = (
    res: Response,
    {
        code = 200,
        success = true,
        data = {},
        toast = { status: 'success', message: 'Successful operation' },
    } = {}
) => {
    return res.status(code).json({
        code,
        success,
        data,
        toast,
    });
};

export { errorResponse, successResponse };
