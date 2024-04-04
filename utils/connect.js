import mongoose from 'mongoose';
import { URI } from './env.js';

const connect = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log(`Welcome to MongoDB`);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connect;
