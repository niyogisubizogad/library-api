import { getAllBooks } from "../services/bookService.js";

const getBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks(req.query);
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};
export default getBooks;
