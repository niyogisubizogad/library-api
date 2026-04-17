import { books } from "../store/inMemoryStore.js";
const findById = async (id)=>{
  return await books.find(book => book.id == id)
}
const getAll = async () => {
  return books;
};
const createBook = async (book) => {
  await books.push(book);
  return book;
};
const update = async (id, updateBook) => {

  const index = books.findIndex((b) => b.id === id);
  books[index] = updateBook;
  
  return books[index];
};
export { getAll, createBook, update,findById };
