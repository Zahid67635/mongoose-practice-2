import { Request, Response } from "express"
import { CourseSchemaValidation } from "./course.validation"
import { courseServices } from "./course.service"
import { calculateDurationInWeeks } from "./course.utils"

const createCourse = async (req: Request, res: Response) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 500,
                description: error.message
            }
        })
    }
}
export const courseControllers = {
    createCourse
}
