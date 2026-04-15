import {books} from "../store/inMemoryStore.js";

const findById= async (id)=>{
  const book = books.find(b =>b.id === id);
  return book;
}

const getAll = async () => {
  return books;
};
const create = async (book) => {
  books.push(book);
  return book;
};
const update= async (id,updateBook)=>{
  const index = books.findIndex(b =>b.id === id);

  if(index < 0) return null;

  books[index] = updateBook;
  return books[index];
  
}
const remove = async (id)=>{
  const index = books.findIndex(b => b.id === id);
  if(index < 0) return null;
  const deletedBook = books.splice(index,1);
  return deletedBook[0];
}

export { getAll, create ,update,findById,remove};
