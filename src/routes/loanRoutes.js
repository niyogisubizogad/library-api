import express from 'express';
import * as loanController from '../controllers/loanController.js';

const router = express.Router();

router.post('/', loanController.createLoans);
router.patch('/:id/return', loanController.returnBook);

//TODO: this endpoint is supposed to retrieve loans taken by user but Nyamara iyi task ari yo kwemeza ko igitabo cyatiruwe
/*
Kubwizompamvu code zose zijyanye no kuzana ibitabo byose umu user yatiye zikuremo muriyi branch
uzabikorera muyindi branch

Wasoma api-reference.md kujyirango wiyibutse uko api zikurikirana

*/
router.get("/user/:userId", loanController.returnUserLoan)

export default router;