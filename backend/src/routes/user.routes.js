import * as usercontroller from '../controller/user.controller.js'
import express from 'express'
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = express.Router();
// router.get('/', usercontroller.getUsers);
router.post('/register', usercontroller.userSignup);
router.post('/login', usercontroller.userLogin);
// router.get('/profile', usercontroller.getUserProfile);
// router.put('/profile', usercontroller.updateUserProfile);
// router.delete('/profile', usercontroller.deleteUserProfile);

export default router;