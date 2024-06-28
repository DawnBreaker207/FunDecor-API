import mongoose from 'mongoose';
import { URI } from '../utils/env';

const connect = async () => {
  await mongoose
    .connect(URI as string)
    .then(() => {
      console.log(`Welcome to MongoDB`);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connect;
