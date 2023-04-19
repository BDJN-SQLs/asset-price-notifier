import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/dbModel';
import cookieParser from 'cookie-parser';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
const SALTROUNDS = 5;

interface userController {
  createUser: RequestHandler;
  loginUser: RequestHandler;
  logoutUser: RequestHandler;
}

export const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
      const newUser = await db.query(
        'INSERT INTO users (email, password, phone) VALUES ($1, $2, $3) RETURNING *',
        [email, hashedPassword, phone]
      );
      res.locals.userId = newUser.rows[0]._id;

      // create random session id
      const sessionId = uuid.v4();

      // set cookie with session id
      res.cookie('ssid', sessionId, { httpOnly: true });

      // attach session id to res.locals
      res.locals.SSIDCookie = sessionId;

      return next();

    } catch (error) {
      return next({
        log: `Error in userController.createUser`,
        status: 400,
        message: { err: error },
      });
    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await db.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      if (user.rowCount === 0) {
        //handle invalid email/password
        res.locals.userId = 'invalid';
        return next();
      } else {
        let hashedPassword;
        hashedPassword = user.rows[0].password;
        const compare = await bcrypt.compare(password, hashedPassword);
        if (compare) {
          res.locals.userId = user.rows[0]._id;

          // create random session id and set cookie
          const sessionId = uuid.v4();
          res.cookie('ssid', sessionId, { httpOnly: true });
          res.locals.SSIDCookie = sessionId;

        } else res.locals.userId = 'invalid';
        return next();
      }
    } catch (error) {
      return next({
        log: `Error in userController.loginUser`,
        status: 400,
        message: { err: error },
      });
    }
  },

  logoutUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      // get ssid from cookie
      const { ssid } = req.cookies;

      // store ssid in res.locals to be used in middleware to delete session from db
      res.locals.ssid = ssid;

      // delete ssid cookie from browser
      res.clearCookie('ssid');

      return next();
    } catch (error) {
      return next({
        log: `Error in userController.logoutUser`,
        status: 400,
        message: { err: error },
      });
    }
  },
};
