import { Request, Response, NextFunction, RequestHandler } from 'express';
const Session = require('../models/sessionModel');

export const sessionController = {
  isLoggedin: (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.ssid)
      Session.find(
        { cookieId: req.cookies.ssid },
        (err: any, response: any) => {
          if (err)
            return next({
              log: 'Error in sessionController.isLoggedin',
              message: { err: 'sessionController.isLoggedIn' + err },
            });
          if (response.length === 0) return res.redirect('/login');
          else {
            return next();
          }
        }
      );
    else return res.redirect('/login');
  },

  startSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Session.create({ cookieId: res.locals.SSIDCookie });
      return next();
    } catch (e) {
      return next({
        log: 'sessionController.startSession',
        message: { err: 'sessionController.startSession' + e },
      });
    }
  },
};
