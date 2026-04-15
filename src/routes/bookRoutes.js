import express from "express";
import * as controller from "../controllers/bookController.js";
import createBookSchema from "../validators/bookValidator.js";
import validateBody from "../middleware/validate.js";
import  updateBookMiddlewares from "../middleware/validateBookUpdate.js";

const router = express.Router();

router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.post("/", validateBody(createBookSchema), controller.createBook);
router.put("/:id", updateBookMiddlewares, controller.updateBook);
router.delete("/:id", controller.deleteBook)


export default router;
