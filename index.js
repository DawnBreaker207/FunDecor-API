import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
const PORT = 8888;
const URL = 'mongodb://localhost:27017/Nodejs';
const app = express();

app.use(express.json());
app.use('/api/v1', router);

await mongoose
  .connect(URL)
  .then(() => {
    console.log(`Welcome to MongoDB`);
  })
  .catch((err) => console.log(`Error connecting to MongoDB, error: ${err}`));

app.listen(PORT, () => {
  console.log(`Listen on port http://localhost:${PORT}/api/v1/products`);
});
