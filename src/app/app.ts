import express from 'express'
const app = express()
import cors from 'cors';
import { courseRoutes } from './modules/course/course.route';

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the course review operations')
})
app.use('/api/course', courseRoutes)

export default app;

