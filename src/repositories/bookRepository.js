import { books } from "../store/inMemoryStore.js";

const getAll = async () => {
  return books;
};
const createBook = async (book) => {
  await books.push(book);
  return book;
};

export { getAll, createBook };
