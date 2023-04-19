import express from 'express';
import { tickerController } from '../controllers/tickerController';
import { sessionController } from '../controllers/sessionController';

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
  return res.status(200).json(res.locals.price);
});

export default router;
