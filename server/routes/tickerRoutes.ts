import express from 'express';
import { tickerController } from '../controllers/tickerController';
import { sessionController } from '../controllers/sessionController';

const router = express.Router();

// all of these routes require an active session
router.post('/userTickers', sessionController.isLoggedin, tickerController.getUserTickers, (req, res) => {
  return res.status(200).json(res.locals.userTickers);
});

router.post('/createNotif', sessionController.isLoggedin, tickerController.createNotif, (req, res) => {
  return res.status(200).json(res.locals.notif);
});

router.delete('/deleteNotif', sessionController.isLoggedin, tickerController.deleteNotif, (req, res) => {
  return res.status(200).json(res.locals.notif);
});

// search for a ticker's specific price and name
router.post('/search', tickerController.search, (req, res) => {
  return res.status(200).json({ price: res.locals.price, name: res.locals.name });
});

// get all tickers from the mock database
router.get('/findAllTickers', tickerController.findAllTickers, (req, res) => {
  return res.status(200).json(res.locals.tickers);
});

export default router;
