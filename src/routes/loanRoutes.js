import express from 'express';
import * as loanController from '../controllers/loanController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/',verifyJWT, loanController.createLoans);     
router.get("/user/:userId",verifyJWT, loanController.returnUserLoan);

export default router;