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
const remove = async (id)=>{
  const index = books.findIndex(b => b.id === id);
  if(index < 0) return null;
  const deletedBook = books.splice(index,1);
  return deletedBook[0];
}

export { getAll, createBook ,update,findById,remove};
