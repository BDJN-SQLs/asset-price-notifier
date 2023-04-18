import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
const path = require('path');
const db = require('./models/dbModel.ts');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */

// app.use('/solo', middleware);
app.use('/user', router);

// catch-all route handler
app.use((req, res) => res.status(404).send('PAGE NOT FOUND!'));

type ServerError = Error & {
  status?: number;
};

// Global error handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
