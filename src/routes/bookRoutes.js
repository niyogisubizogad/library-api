import express from "express";
import {
  getBooks,
  addBook,
  updatingBook,
  deleteBook,
} from "../controllers/bookController.js";
import createBookSchema from "../../validators/bookValidator.js";
import validateBody from "../middleware/validate.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", validateBody(createBookSchema), addBook);
router.put("/:id", updatingBook);
router.delete("/:id", deleteBook)

export default router;
