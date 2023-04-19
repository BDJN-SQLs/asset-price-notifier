import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routes/userRoutes';
import tickerRouter from './routes/tickerRoutes';
import { sessionController } from './controllers/sessionController';
const path = require('path');
const db = require('./models/dbModel.ts');
const app = express();
const cookieParser = require('cookie-parser');
// Postgres connection
const PORT = process.env.PORT || 8080;
// Mongo connection
const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.use(cookieParser());

/**
 * define route handlers
 */

// app.use('/solo', middleware);
app.use('/user', userRouter);

app.use('/tickers', tickerRouter);

// use this route to check if user is logged in when new page is loaded
app.get('/auth', sessionController.isLoggedin, (req, res) => {
  return res.status(200).json(res.locals.user);
});

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
