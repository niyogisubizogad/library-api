import express from 'express';

import { createUser } from '../controllers/userController.js';
import UserSchema from '../validators/userValidator.js';
import validate from '../middleware/validate.js';
import emailTaken from '../middleware/validateUserAccount.js';

const router = express.Router();

router.post('/',emailTaken, validate(UserSchema), createUser);

export default router;