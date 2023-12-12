/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500
    const message = err.message || 'Something went wrong'

    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage: '',
        errorDetails: err,
        stack: err.message
    })
}
export default globalErrorHandler