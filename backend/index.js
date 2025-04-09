import app from './app.js';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';

dotenv.config();
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; (self signed ceritificate)

const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
