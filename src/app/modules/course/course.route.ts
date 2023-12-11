import express from 'express';
import { courseControllers } from './course.controller';
const router = express.Router()

router.post('/', courseControllers.createCourse)

export const courseRoutes = router