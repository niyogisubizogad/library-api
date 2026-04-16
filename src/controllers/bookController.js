import * as service from "../services/bookService.js";

const createBook = async (req, res, next) => {
  try {
    const book = await service.createBook(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};
const getBooks = async (req, res, next) => {
  try {
    const books = await service.getAllBooks(req.query);
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};
export { getBooks, createBook };
