import express from 'express';
import createLoans from '../controllers/loanController.js';

const router = express.Router();

router.post('/', createLoans);

export default router;