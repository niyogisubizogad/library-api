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

  if(index === -1) return null;

  books[index] = updateBook;
  return books[index];
  
}

export { getAll, create ,update,findById};
