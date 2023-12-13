import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (course: TCourse) => {
    if (await CourseModel.isValidCategoryId(course.categoryId)) {
        const result = await CourseModel.create(course);
        return result;
    }
    throw new Error('CategoryId not exists')

}

export const courseServices = {
    createCourseIntoDB
}