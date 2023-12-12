import { NextFunction, Request, Response } from "express"
import { CourseSchemaValidation } from "./course.validation"
import { courseServices } from "./course.service"
import { calculateDurationInWeeks } from "./course.utils"

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = req.body
        const zodData = CourseSchemaValidation.parse(course)
        zodData.durationInWeeks = calculateDurationInWeeks(zodData.startDate, zodData.endDate)
        const result = await courseServices.createCourseIntoDB(zodData)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
export const courseControllers = {
    createCourse
}
