import * as service from "../services/bookService.js";

const createBook = async (req, res, next) => {
  try {
    const book = await service.createBook(req.body);
    return res.status(201).json({
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
    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.updateBook(id, req.body);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export { getBooks, createBook, updateBook };
