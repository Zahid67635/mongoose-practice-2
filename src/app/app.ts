import express from 'express'
const app = express()
import cors from 'cors';
import { courseRoutes } from './modules/course/course.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the course review operations')
})
app.use('/api/course', courseRoutes)

app.use(globalErrorHandler)

app.use(notFound)
export default app;

