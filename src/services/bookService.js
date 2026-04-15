import { v4 as uuidv4 } from 'uuid';
import { getAll,create,update, findById } from "../repositories/bookRepository.js";
import appError from '../utils/appError.js';

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
//updating existing book by it's id
const updateBook = async (id,data) =>{
  let book = await findById(id);
  if(!book){
   throw new appError("book not found",404)
  }
  if(data.totalCopies !== undefined){
      const diff =data.totalCopies - book.totalCopies;
      book.availableCopies += diff;
  }
   const updatedBook = {
    ...book,
    ...data
  };
  return await update({id, updatedBook})
}

export { getAllBooks,createBook,updateBook };
