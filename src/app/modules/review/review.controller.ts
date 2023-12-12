import { reviewServices } from "./review.service"
import { NextFunction, Request, Response } from "express"
import { ReviewValidationSchema } from "./review.validation"
import { Types } from "mongoose"


const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = req.body
        review.courseId = new Types.ObjectId(review.courseId)
        const zodData = ReviewValidationSchema.parse(review)
        const result = await reviewServices.createReviewIntoDB(zodData)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Review created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

export const reviewControllers = {
    createReview
}