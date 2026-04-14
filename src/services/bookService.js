import { getAll } from "../repositories/bookRepository.js";


const getAllBooks = async (filters) => {
  const { genre, available } = filters;

  let books = await getAll();
  console.log(filters);
  if (genre) {
    books = books.filter(
      (book) => book.genre.toLowerCase() == genre.toLowerCase(),
    );
  }
  if (available === true) {
    books = books.filter((book) => book.availableCopies > 0);
  }
  return books;
};
export { getAllBooks };
