/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from "express"
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = 'Something went wrong'
    let errorMessage = err.message
    let errorDetails = err
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        errorMessage = err.Error
        message = simplifiedError?.message;
        errorDetails = simplifiedError?.errorSources
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorDetails = err;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: err?.stack,

    })
}
export default globalErrorHandler