import express from 'express'
const app = express()
import cors from 'cors';

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the course review operations')
})

export default app;

