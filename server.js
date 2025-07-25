import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/user', userRoutes);
app.use('/task', taskRoutes)

app.listen(port, () => {
    console.log(`Server is running in: http://localhost${port}`);
})