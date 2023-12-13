import mongoose from "mongoose";
import { TReview } from "../common.interface";
import { CourseModel } from "../course/course.model";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (review: TReview) => {
    const result = await ReviewModel.create(review);
    return result;
}
const getCourseDetailsFromDB = async (courseId: string) => {
    const result = await CourseModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(courseId) }
        },
        {
            $lookup:
            {
                from: "reviews",
                localField: "_id",
                foreignField: "courseId",
                as: "reviews"
            }
        },
        {
            $project: { "reviews._id": 0, "reviews.__v": 0, "__v": 0, "tags._id": 0 }
        }
    ])
    if (result.length > 0) {
        return result
    }
    throw new Error('Course Not found')
}
export const reviewServices = {
    createReviewIntoDB, getCourseDetailsFromDB
}