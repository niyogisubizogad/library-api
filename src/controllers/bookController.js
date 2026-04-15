import {
  getAllBooks,
  createBook,
  updateBook,
} from "../services/bookService.js";

const addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, genre, totalCopies } = req.body;
    const book = await createBook({
      title,
      author,
      isbn,
      genre,
      totalCopies,
    });
    res.status(201).json({
      success: true,
      data: book,
    });
    if (!book) {
      res.status(400).json({
        success: false,
        message: '"title" is required. "totalCopies" must be a number',
      });
    }
  } catch (err) {
    next(err);
  }
};
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
const updatingBook = async (req, res, next) => {
  try{
  const { id } = req.params;
  const book = await updateBook(id, req.body);

  res.status(200).json({
    success: true,
    data: book,
  });
}
catch(err){
  next(err);
}

};
export { getBooks, addBook,updatingBook };
