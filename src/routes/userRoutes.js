import express from 'express';

import { createUser,loginUser } from '../controllers/userController.js';
import UserSchema from '../validators/userValidator.js';
import validate from '../middleware/validate.js';
import {emailTaken, validateUserCredential} from '../middleware/validateUserAccount.js';


const router = express.Router();

router.post('/register',emailTaken, validate(UserSchema), createUser);
router.post('/login',validateUserCredential, loginUser)

export default router;