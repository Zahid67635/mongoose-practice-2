import { Types } from "mongoose"

export type TCategory = {
    name: string
}
export type TReview = {
    courseId: Types.ObjectId,
    rating: number,
    review: string
}