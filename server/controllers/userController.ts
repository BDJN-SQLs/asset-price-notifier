import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/dbModel';
import cookieParser from 'cookie-parser';
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
        if (compare) res.locals.userId = user.rows[0]._id;
        else res.locals.userId = 'invalid';
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
      const { userId } = req.body;
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
