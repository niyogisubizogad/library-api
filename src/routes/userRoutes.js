import express from 'express';

import * as userController from '../controllers/userController.js';
import UserSchema from '../validators/userValidator.js';
import validate from '../middleware/validate.js';
import { emailTaken, validateUserCredential} from '../middleware/validateUserAccount.js';
import { verifyJWT } from '../middleware/verifyJWT.js';


const router = express.Router();

router.post('/register',emailTaken, validate(UserSchema), userController.createUser);
router.post('/login', validateUserCredential, userController.loginUser);
router.get('/:id', userController.getUserById)

export default router;