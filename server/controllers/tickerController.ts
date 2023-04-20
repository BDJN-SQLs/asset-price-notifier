import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/dbModel';
import { prices, Tickers, TickerItem } from '../tickerPrice';

interface tickerController {
  getUserTickers: RequestHandler;
  createNotif: RequestHandler;
  deleteNotif: RequestHandler;
  search: RequestHandler;
}

let time = 0;
setInterval(async () => {
  time++;
  // console.log(time, 'time');
  if (time === 10) {
    time = 0;
  }
  // Check every ticker to see if it's price is equal to or below the notifPrice
  const tickerWatch = await db.query(`
   SELECT u._id, u.phone, n._id as notif_id, n.ticker, n.notifprice FROM users u
   JOIN notifications n ON n.user_id = u._id`);
  // Get everything from database
  // Loop through each row and check if the current price of that ticker is equal to or below the notifPrice
  for (let i = 0; i < tickerWatch.rows.length; i++) {
    const { ticker, notifprice, phone, notif_id, _id } = tickerWatch.rows[i];
    const price = prices[ticker].price[time];
    if (price <= Number(notifprice)) {
      // If it is, send text to the user
      // sendText(ticker, price, phone, notifprice);
      // Delete the notification from the database
      // await db.query(
      //   'DELETE FROM notifications WHERE user_id = $1 AND _id = $2 RETURNING *',
      // [userId, notifId]
      // );
      // console.log(`SEND TEXT ${ticker} at ${price} is below ${notifprice}}`);
    }
  }
  //  if it is, send text
}, 10000);

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

function sendText(
  ticker: string,
  price: number,
  phone: string,
  notifprice: number
) {
  client.messages
    .create({
      body: `ALERT: ${ticker} is now at $${price} which is below your notification price of $${notifprice}`,
      from: '+18335300074',
      to: phone,
    })
    .then((message: any) => console.log(message.sid))
    .catch((err: any) => console.log('TWILIO', err));
}

export const tickerController = {
  getUserTickers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      console.log('this is the body', req.body)
      const userTickers = await db.query(
        'SELECT * FROM notifications WHERE user_id = $1',
        [userId]
      );
      res.locals.userTickers = userTickers.rows;
      return next();
    } catch (error) {
      return next({
        log: 'Error in tickerController.getUserTickers',
        status: 400,
        message: { err: error },
      });
    }
  },

  createNotif: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, ticker, notifPrice } = req.body;
      const notif = await db.query(
        'INSERT INTO notifications (user_id, ticker, notifprice) VALUES ($1, $2, $3) RETURNING *',
        [userId, ticker, notifPrice]
      );
      res.locals.notif = notif.rows[0];
      return next();
    } catch (error) {
      return next({
        log: 'Error in tickerController.createNotif',
        status: 400,
        message: { err: error },
      });
    }
  },

  deleteNotif: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, tickerId } = req.body;
      const notif = await db.query(
        'DELETE FROM notifications WHERE user_id = $1 AND _id = $2 RETURNING *',
        [userId, tickerId]
      );
      res.locals.notif = notif.rows[0];
      return next();
    } catch (error) {
      return next({
        log: 'Error in tickerController.deleteNotif',
        status: 400,
        message: { err: error },
      });
    }
  },

  // must search the JSON obj for the ticker prices/names
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticker } = req.body;
      const tickerData: TickerItem = prices[ticker];
      res.locals.price = tickerData.price[time];
      return next();
    } catch (error) {
      return next({
        log: 'Error in tickerController.search',
        status: 400,
        message: { err: error },
      });
    }
  },
};
