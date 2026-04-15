import { v4 as uuidv4 } from 'uuid';
import { getAll,create } from "../repositories/bookRepository.js";

//creating new book
const createBook = async({title,author,isbn,genre,totalCopies})=>{
  const newBook = {
    id:uuidv4(),
    title,
    author,
    isbn,
    genre,
    totalCopies,
    availableCopies:totalCopies,
    createdAt:new Date().toISOString()
  }
  return await create(newBook);

}
//fetching all books
const getAllBooks = async (filters) => {
  const { genre, available } = filters;

  let books = await getAll();
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
export { getAllBooks,createBook };
