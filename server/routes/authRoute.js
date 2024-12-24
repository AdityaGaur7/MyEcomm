import express from 'express';
import { registerController, loginController } from '../controllers/authController.js';
import {requireSignIn,isAdmin} from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', requireSignIn,isAdmin, (req, res) => {
    res.send('ok');
});


export default router;