import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import { errorHandler, errorHandlerNotFound } from './utils/errorHandler.js';
import { PORT } from './utils/env.js';
import connect from './utils/connect.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

connect();
// Error Handling
app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT, () => {
  console.log(`Listen on port http://localhost:${PORT}/api/v1/`);
});
