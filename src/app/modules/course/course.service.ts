import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (course: TCourse) => {
    if (await CourseModel.isValidCategoryId(course.categoryId)) {
        const result = await CourseModel.create(course);
        return result;
    }
    throw new Error('CategoryId not exists')

}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    let page = 1;
    let limit = 0;
    let skip = 0;

    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    const result = await CourseModel.find(query).limit(limit).skip(skip)

    return result;

}

export const courseServices = {
    createCourseIntoDB, getAllCourseFromDB
}