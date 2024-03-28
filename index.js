import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import { errorHandler, errorHandlerNotFound } from './utils/errorHandler.js';
import dotnet from 'dotenv';
dotnet.config({ path: './.env.local' });
const { PORT, URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

// Error Handling
app.use(errorHandlerNotFound, errorHandler);

await mongoose
  .connect(URI)
  .then(() => {
    console.log(`Welcome to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Listen on port http://localhost:${PORT}/api/v1/products`);
    });
  })
  .catch((err) => console.log(`Error connecting to MongoDB, error: ${err}`));
