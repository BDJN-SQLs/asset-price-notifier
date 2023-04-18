import express from 'express';
import { tickerController } from '../tickerController/tickerController';

const router = express.Router();

router.post('/userTickers', tickerController.getUserTickers, (req, res) => {
  return res.status(200).json(res.locals.userTickers);
});

router.post('/createNotif', tickerController.createNotif, (req, res) => {
  return res.status(200).json(res.locals.notif);
});

router.delete('/deleteNotif', tickerController.deleteNotif, (req, res) => {
  return res.status(200).json(res.locals.notif);
});

router.post('/search', tickerController.search, (req, res) => {
  return res.status(200).json(res.locals.search);
});

export default router;
