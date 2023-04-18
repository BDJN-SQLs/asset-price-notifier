import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  console.log('SIGNUP ROUTE', res.locals.userId);
  res.status(200).json(res.locals.userId);
});

router.post('/login', userController.loginUser, (req, res) => {
  console.log('LOGIN ROUTE', res.locals.userId);
  res.status(200).json(res.locals.userId);
});

router.post('/logout', userController.logoutUser, (req, res) => {
  console.log('LOGOUT ROUTE', res.locals.userId);
  res.sendStatus(200);
});

export default router;
