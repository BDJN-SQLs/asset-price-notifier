import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routes/userRoutes';
import tickerRouter from './routes/tickerRoutes';
import cors from 'cors';
const path = require('path');
const db = require('./models/dbModel.ts');
const app = express();
const cookieParser = require('cookie-parser');
// Postgres connection
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cookieParser());


// Mongo connection
const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI);
/**
 * define route handlers
 */

// app.use('/solo', middleware);
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

app.post('/twilio', (req, res) => {
  const { ticker, price, phone, notifprice } = req.body;
  client.messages
  .create({
    body: `ALERT: ${ticker} is now at $${price} which is below your notification price of $${notifprice}`,
    from: '+18335300074',
    to: phone,
  })
  .then((message: any) => console.log(message.sid))
  .catch((err: any) => console.log('TWILIO', err));
  res.sendStatus(200);
})

app.use('/user', userRouter);

app.use('/tickers', tickerRouter);

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
