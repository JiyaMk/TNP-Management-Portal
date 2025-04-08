import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import companyRouter from './routes/companyRoute.js';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  sameSite: 'none',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/company', companyRouter);

export default app;
