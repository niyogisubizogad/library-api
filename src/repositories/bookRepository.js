import {books} from "../store/inMemoryStore.js";


const getAll = async () => {
  return books;
};
const create = async (book) => {
  books.push(book);
  return book;
};

export { getAll, create };
