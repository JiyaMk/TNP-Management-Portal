import express from 'express';
import dotenv from 'dotenv';
const app = express();
import dbConnect from './config/dbConnect.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
