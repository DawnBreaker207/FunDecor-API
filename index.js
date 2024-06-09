import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import { errorHandler, errorHandlerNotFound } from './utils/errorHandler.js';
import { PORT } from './utils/env.js';
import connect from './utils/connect.js';
import expressListEndpoints from 'express-list-endpoints';
import multer from 'multer';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

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
app.get('/api/v1', (req, res) => {
  const routeList = expressListEndpoints(app);
  const data = [];

  routeList.forEach(({ path, methods }) => {
    const check = methods.includes('GET') && methods.includes('POST');
    if (check) {
      data.push(path);
    }
  });
  const simpleHTML = /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Main Page</title>
      <style>
        *{
          padding: 0;
          margin: 0;
          box-sizing: border-box
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          width: 500px;
          margin: 0 auto;
          text-align: center
        }
        p{
          margin: 10px
        }
        h1 {
          color: blue;
        }
        ul:{
          margin: 10px 0
        }
        li{
          list-style: none;
          padding: 5px 0;
        }
        a{
          text-decoration: none;
          color: blue
        }
      </style>
    </head>
    <body>
      <h1>Xin chào!</h1>
      <p>Đây là trang chủ của ứng dụng</p>
      <p>Bạn có thể thử với các link sau: </p>
      <ul>
      ${data
        .map((index) => {
          return /*html*/ `
          <li><a href=${index}>${index}<a></li>
        `;
        })
        .join('')}.
      </ul>
    </body>
    </html>
  `;
  return res.status(200).send(simpleHTML);
});

//! Init Database
connect();
//! Error Handling
app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT, () => {
  console.log(`Welcome to server`);
});
