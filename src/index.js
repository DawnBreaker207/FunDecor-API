import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/index.js';
import connect from './utils/connect.js';
import { PORT } from './utils/env.js';
import { errorHandler, errorHandlerNotFound } from './utils/errorHandler.js';

const app = express();
//! Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(helmet());

//! Init Router
app.use('/api/v1', router);

//! Init Database
connect();
//! Error Handling
app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT, () => {
  console.log(`Welcome to server`);
});
