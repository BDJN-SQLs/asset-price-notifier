import { Request, Response, NextFunction, RequestHandler } from 'express';

export const cookieController = {
  setCookie: (req: Request, res: Response, next: NextFunction) => {
    res.cookie('cookieName', 'cookieValue', { httpOnly: true });
    res.cookie('secret', Math.floor(Math.random() * 1000000));
    return next();
  },

  //set SSID cookie???
};
