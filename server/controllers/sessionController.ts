import { Request, Response, NextFunction, RequestHandler } from 'express';
const Session = require('../models/sessionModel');
import cookieParser from 'cookie-parser';

export const sessionController = {
  isLoggedin: async (req: Request, res: Response, next: NextFunction) => {
    try {

      // check if cookie exists
      if (req.cookies.ssid) {
        const session = await Session.findOne({ cookieId: req.cookies.ssid });

        // if cookie exists, check if session exists in db and attach userId to res.locals
        if (session) {
          res.locals.userId = session.userId;

          return next();
        } else {
          return next({
            log: 'sessionController.isLoggedin',
            message: { err: 'Access denied' },
          });
        }
      } else {
        return next({
          log: 'sessionController.isLoggedin',
          message: { err: 'Access denied' },
        });
      }
    } catch (e) {
      return next({
        log: 'sessionController.isLoggedin',
        message: { err: 'sessionController.isLoggedin' + e },
      });
    }
  },

  startSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // create session in db and attach userId
      if (res.locals.SSIDCookie) await Session.create({
        cookieId: res.locals.SSIDCookie,
        userId: res.locals.userId,
      });
      return next();
    } catch (e) {
      return next({
        log: 'sessionController.startSession',
        message: { err: 'sessionController.startSession' + e },
      });
    }
  },

  endSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // delete session in db if cookie exists
      if (res.locals.ssid) await Session.deleteOne({ cookieId: req.cookies.ssid });
      return next();
    } catch (e) {
      return next({
        log: 'sessionController.endSession',
        message: { err: 'sessionController.endSession' + e },
      });
    }
  }
};
