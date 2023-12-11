import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (course: TCourse) => {
    const result = await CourseModel.create(course);
    return result;
}

export const courseServices = {
    createCourseIntoDB
}