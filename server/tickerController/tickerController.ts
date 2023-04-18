import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/dbModel';
import fs from 'fs';

interface tickerController {
  getUserTickers: RequestHandler;
  createNotif: RequestHandler;
  deleteNotif: RequestHandler;
  search: RequestHandler;
}

let position = 0;
setInterval(() => {
  position++;
  console.log(position, 'position');
  if (position === 10) {
    position = 0;
  }
}, 5000);

export const tickerController = {
  getUserTickers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
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
      const { userId, ticker, targetPrice } = req.body;
      const notif = await db.query(
        'INSERT INTO notifications (user_id, ticker, notifprice) VALUES ($1, $2, $3) RETURNING *',
        [userId, ticker, targetPrice]
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
  search: async (req: Request, res: Response, next: NextFunction) => {},
};
