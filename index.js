import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.PORT;
const URI = process.env.URI;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);

await mongoose
  .connect(URI)
  .then(() => {
    console.log(`Welcome to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Listen on port http://localhost:${PORT}/api/v1/products`);
    });
  })
  .catch((err) => console.log(`Error connecting to MongoDB, error: ${err}`));
