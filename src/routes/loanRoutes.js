import express from 'express';
import * as loanController from '../controllers/loanController.js';

const router = express.Router();

router.post('/', loanController.createLoans);
router.patch('/:id/return', loanController.returnBook);

export default router;