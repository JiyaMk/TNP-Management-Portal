import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRouter);

export default app;
