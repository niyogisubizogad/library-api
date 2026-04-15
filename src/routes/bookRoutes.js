import express from 'express';
import {getBooks,addBook} from '../controllers/bookController.js';
import createBookSchema from '../../validators/bookValidator.js';
import validateBody from '../middleware/validate.js';

const router =  express.Router();

router.get('/', getBooks);
router.post('/',validateBody(createBookSchema), addBook);

export default router;