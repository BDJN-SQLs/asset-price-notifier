import express from 'express';
import { userController } from '../controllers/userController';
import { sessionController } from '../controllers/sessionController';

const router = express.Router();

// signup and login both start a session
router.post('/signup', userController.createUser, sessionController.startSession, (req, res) => {
  console.log('SIGNUP ROUTE', res.locals.userId);
  res.status(200).json(res.locals.userId);
});

router.post('/login', userController.loginUser, sessionController.startSession, (req, res) => {
  console.log('LOGIN ROUTE', res.locals.userId);
  res.status(200).json(res.locals.userId);
});

// logout ends a session and deletes the cookie if it exists
router.post('/logout', userController.logoutUser, sessionController.endSession, (req, res) => {
  res.sendStatus(200);
});

export default router;
