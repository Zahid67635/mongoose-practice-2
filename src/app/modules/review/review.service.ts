import { TReview } from "../common.interface";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (review: TReview) => {
    const result = await ReviewModel.create(review);
    return result;
}

export const reviewServices = {
    createReviewIntoDB
}