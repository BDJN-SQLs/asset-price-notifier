import express from 'express';
import { userController } from '../userController/userController';

const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  console.log('SIGNUP ROUTE', res.locals.user);
  res.status(200).json(res.locals.user);
});

export default router;
