/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from "express"
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = 'Something went wrong'
    let errorMessage = ''
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: err?.stack
    })
}
export default globalErrorHandler