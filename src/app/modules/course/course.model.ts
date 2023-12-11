import { Schema, model } from "mongoose";
import { TCourse, TTag } from "./course.interface";


const TagSchema = new Schema<TTag>({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
});

const CourseSchema = new Schema<TCourse>({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [TagSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true,
        },
        description: { type: String, required: true },
    },
});

export const CourseModel = model<TCourse>('Course', CourseSchema);