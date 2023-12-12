import { Schema, model } from "mongoose";
import { TReview } from "../common.interface";

const ReviewSchema = new Schema<TReview>({
    courseId: { type: Schema.Types.ObjectId, required: [true, 'CourseId is required'], ref: 'Course' },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: { type: String, required: [true, 'Review is required'] },
});

export const ReviewModel = model<TReview>('Review', ReviewSchema);