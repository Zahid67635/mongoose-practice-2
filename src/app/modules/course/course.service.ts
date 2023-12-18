import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import { calculateDurationInWeeks } from "./course.utils";

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
    let sortCriteria = '-price'
    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    if (query.sortBy === 'title') {
        sortCriteria = query.sortOrder === 'asc' ? 'title' : '-title'
    } else if (query.sortBy === 'price') {
        sortCriteria = query.sortOrder === 'asc' ? 'price' : '-price'
    } else if (query.sortBy === 'startDate') {
        sortCriteria = query.sortOrder === 'asc' ? 'startDate' : '-startDate'
    } else if (query.sortBy === 'endDate') {
        sortCriteria = query.sortOrder === 'asc' ? 'endDate' : '-endDate'
    } else if (query.sortBy === 'language') {
        sortCriteria = query.sortOrder === 'asc' ? 'language' : '-language'
    } else if (query.sortBy === 'durationInWeeks') {
        sortCriteria = query.sortOrder === 'asc' ? 'durationInWeeks' : '-durationInWeeks'
    }
    const result = await CourseModel.find({}).sort(sortCriteria).limit(limit).skip(skip)

    return result;

}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { details, ...rest } = payload
    let durationInWeeks;
    if (payload.endDate) {
        const data = await CourseModel.findById(id)
        if (data?.startDate) {
            durationInWeeks = calculateDurationInWeeks(data.startDate, payload.endDate)
        }
    }
    const updatedFields = {
        "details.level": details?.level,
        "details.description": details?.description,
        durationInWeeks,
        ...rest
    };

    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        {
            new: true,
            upsert: true,
            runValidators: true,
        },
    );

    if (!updatedBasicCourseInfo) {
        throw new Error('Failed to update');
    }
    return updatedBasicCourseInfo
}
export const courseServices = {
    createCourseIntoDB, getAllCourseFromDB, updateCourseIntoDB
}