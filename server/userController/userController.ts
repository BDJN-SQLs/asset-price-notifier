import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/dbModel';
import fs from 'fs';
import path from 'path';
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
      console.log('inside new user', newUser.rows[0]._id); // paused here.
      res.locals.user = newUser.rows[0]._id;
      return next();
    } catch (error) {
      return next({
        log: `Error in userController.createUser`,
        status: 400,
        message: { err: error },
      });
    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {},

  logoutUser: async (req: Request, res: Response, next: NextFunction) => {},
};
