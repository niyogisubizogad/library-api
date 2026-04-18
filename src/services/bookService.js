import { v4 as uuidv4 } from "uuid";
import * as repository from "../repositories/bookRepository.js";

const createBook = async ({ title, author, isbn, genre, totalCopies }) => {
  const newBook = {
    id: uuidv4(),
    title,
    author,
    isbn,
    genre,
    totalCopies,
    availableCopies: totalCopies,
    createdAt: new Date().toISOString(),
  };
  return await repository.createBook(newBook);
};

const getAllBooks = async (filters) => {
  const { genre, available } = filters;

  let books = await repository.getAll();
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

const updateBook = async (id, data) => {
const book = await repository.findById(id);

  if (data.totalCopies !== undefined) {
    const diff = data.totalCopies - book.totalCopies;
    book.availableCopies += diff;
  }
  const updatedBook = {
    ...book,
    ...data,
  };
  return await repository.update(id, updatedBook);
};
const deleteBookById = async (id)=>{
  let book = await repository.remove(id);
  if(!book){
    throw new appError("Book Not Found",404);
  }
  return book;
 
}
//get by id 
const getBook = async (id)=>{
  const book = await repository.findById(id);
  if(!book){
    return {
      success:false,
      message: "Book Not Found"
    }
  }
  return {
    success:true,
    data:book
  };
}

export { getAllBooks,createBook,updateBook,deleteBookById,getBook };
